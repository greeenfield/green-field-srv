import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
// import * as path from 'path'

import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { NoteModule } from './modules/note/note.module'

import { Note } from './entity/note.entity'
import { UserProfile } from './entity/profile.entity'
import { User } from './entity/user.entity'
import { Tag } from './entity/tag.entity'
import { NoteMeta } from './entity/noteMeta.entity'

const getTypeOrmModule = () => {
  // const entitiesPath = path.join(__dirname, '/entity/*.entitiy{.ts,.js}')

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1111',
    database: 'postgres',
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [Note, UserProfile, User, Tag, NoteMeta],
    autoLoadEntities: true,
    keepConnectionAlive: true,
    namingStrategy: new SnakeNamingStrategy(),
  })
}
@Module({
  imports: [getTypeOrmModule(), AuthModule, UserModule, NoteModule],
})
export class AppModule {}
