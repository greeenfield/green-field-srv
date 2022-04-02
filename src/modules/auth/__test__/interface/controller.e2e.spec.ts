import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import supertest from 'supertest'

import { AppModule } from 'src/app.module'

describe('[E2E] AuthController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()

    await app.init()
  })

  it('[Post] logout', async () => {
    const res = await supertest(app.getHttpServer())
      .post('auth/login')
      .send({ email: 'test@gmail.com', password: 'test' })

    expect(res.status).toBe(200)

    const session = res.header['set-cookie'][0].split(',').map((c) => c.split(';')[0])

    const re = await supertest(app.getHttpServer()).post('auth/logout').set('Cookie', session)
    expect(re.status).toBe(200)
  })
})
