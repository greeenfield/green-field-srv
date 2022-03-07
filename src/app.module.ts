import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UserModule } from '#modules/user/user.module'
import { NoteModule } from '#modules/note/note.module'

import { AppService } from './app.service'
import { getTypeOrmModule } from './typeORM.config'

const getConfigModule = () => {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.development',
  })
}

@Module({
  imports: [getConfigModule(), getTypeOrmModule(), UserModule, NoteModule],
  providers: [AppService],
})
export class AppModule {}
