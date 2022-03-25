import { Test, TestingModule } from '@nestjs/testing'
import { CqrsModule } from '@nestjs/cqrs'
import { UserController } from 'src/modules/user/interface/user.controller'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UserController],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
