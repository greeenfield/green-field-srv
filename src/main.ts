import 'reflect-metadata'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { validateEnvironmentVars } from './config/configuration'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  validateEnvironmentVars()

  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(configService.get<string>('PORT'))
}
bootstrap()
