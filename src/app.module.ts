import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
// import * as path from 'path'

import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './app/users/user.module'
import { NoteModule } from './app/notes/note.module'

import { Note } from './app/notes/infrastructure/entities/note.entity'
import { UserProfile } from './app/users/infrastructure/entities/profile.entity'
import { User } from './app/users/infrastructure/entities/user.entity'
import { Tag } from './app/notes/infrastructure/entities/tag.entity'
import { NoteMeta } from './app/notes/infrastructure/entities/noteMeta.entity'

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
