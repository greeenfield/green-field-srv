import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'

import { AppModule } from './app.module'

async function bootstrap() {
  await createConnection()

  const app = await NestFactory.create(AppModule)

  app.use(bodyParser.json())

  await app.listen(3000)
}
bootstrap()
