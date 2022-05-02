import { getConnection } from 'typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'

import { AppModule } from 'src/app.module'
import { mockUserOnDb } from 'test-suite/helper'

describe('[E2E] AuthController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()

    await app.init()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  it('/login', async () => {
    const { email, password } = await mockUserOnDb()

    const res = await request(app.getHttpServer()).post('/auth/login').send({ email, password })

    expect(res.status).toBe(200)
  })
})
