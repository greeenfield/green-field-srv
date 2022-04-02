import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { configuration } from './config/configuration'

export const getTypeOrmModule = () => {
  const { name, host, port, username, password } = configuration().postgresConfig

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host,
    port: Number(port),
    username,
    password,
    database: name,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    synchronize: true,
    autoLoadEntities: true,
    keepConnectionAlive: true,
    namingStrategy: new SnakeNamingStrategy(),
  })
}
