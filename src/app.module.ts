import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UserModule } from '#modules/user/user.module'
import { NoteModule } from '#modules/note/note.module'

import { getTypeOrmModule } from './typeORM.config'

const getConfigModule = () => {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.development',
  })
}

@Module({
  imports: [getTypeOrmModule(), getConfigModule(), UserModule, NoteModule],
})
export class AppModule {}
