import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './modules/auth/auth.module'
import { UserController } from './user/user.controller'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'test',
      password: 'test',
      database: 'test',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
