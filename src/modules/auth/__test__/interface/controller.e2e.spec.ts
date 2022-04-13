import encodings from '../../../../../node_modules/iconv-lite/encodings'

import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'

import { AppModule } from 'src/app.module'
import { mockUserOnDb } from 'test-suite/helper'

describe('[E2E] AuthController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = testingModule.createNestApplication()

    await app.init()
  })

  test('Login', async () => {
    const { email, password } = await mockUserOnDb()

    await request.agent(app.getHttpServer()).post('/auth/login').send({ email, password }).expect(200)
  })
})
