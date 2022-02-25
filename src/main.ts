import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
// import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'

import { validateEnvironmentVars } from './config/configuration'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  validateEnvironmentVars()

  // await createConnection()

  const app = await NestFactory.create(AppModule)

  app.use(bodyParser.json())

  const configService = app.get(ConfigService)

  await app.listen(configService.get<string>('PORT'))
}
bootstrap()
