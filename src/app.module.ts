import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './modules/auth/auth.module'

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
