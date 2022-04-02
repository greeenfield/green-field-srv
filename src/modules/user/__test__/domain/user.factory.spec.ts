import { Test } from '@nestjs/testing'
import { EventPublisher } from '@nestjs/cqrs'

import { UserFactory } from 'src/modules/user/domain/factory'

describe('UserFactory', () => {
  let userFactory: UserFactory
  let eventPublisher: EventPublisher

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserFactory,
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile()

    userFactory = module.get(UserFactory)
    eventPublisher = module.get(EventPublisher)
  })

  const id = 'testId'
  const profileId = 'profileId'
  const username = 'hyojeong'
  const email = 'test@example.com'
  const nickname = 'hyojeong'
  const thumbnail = 'thumbnail'
  const about = 'about'

  describe('create', () => {
    it('Should create User', () => {
      userFactory.create({ id, profileId, username, email, nickname, thumbnail, about })

      expect(eventPublisher.mergeObjectContext).toBeCalledTimes(1)
    })
  })
})
