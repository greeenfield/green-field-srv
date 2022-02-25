import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { configuration } from './config/configuration'

export const getTypeOrmModule = () => {
  const { name, host, port, username, password } = configuration().databaseConfig

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host,
    port: Number(port),
    username,
    password,
    database: name,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    autoLoadEntities: true,
    keepConnectionAlive: true,
    namingStrategy: new SnakeNamingStrategy(),
  })
}
