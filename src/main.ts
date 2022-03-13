import 'reflect-metadata'
import bodyParser from 'body-parser'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { validateEnvironmentVars } from './config/configuration'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  validateEnvironmentVars()

  const app = await NestFactory.create(AppModule)

  app.use(bodyParser.json())

  const configService = app.get(ConfigService)

  await app.listen(configService.get<string>('PORT'))
}
bootstrap()