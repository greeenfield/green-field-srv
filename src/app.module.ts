import { Module, NestModule, Logger, Inject, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import connectRedis from 'connect-redis'
import session from 'express-session'
import passport from 'passport'

import { AuthModule } from '#modules/auth/auth.module'
import { UserModule } from '#modules/user/user.module'
import { NoteModule } from '#modules/note/note.module'

import { AppService } from './app.service'
import { getTypeOrmModule } from './typeORM.config'

import { RedisModule } from '#config/redis/redis.module'
import { REDIS } from '#config/redis/redis.constants'
import { configuration } from '#config/configuration'

const getConfigModule = () => {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'development' ? '.development.env' : '.development.env',
    load: [configuration],
  })
}

@Module({
  imports: [getConfigModule(), getTypeOrmModule(), RedisModule, AuthModule, UserModule, NoteModule],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SESSION_SECRET,
          store: new (connectRedis(session))({ client: this.redis, logErrors: true }),
          resave: false,
          saveUninitialized: false,
          cookie: { maxAge: 60000 },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*')
  }
}
