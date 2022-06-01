import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { BadRequestException, Inject } from '@nestjs/common'

import { InjectionToken } from '#shared/enum/injection-token'

import { CreateUserCommand } from '#modules/user/application/commands/implement/create-user.command'
import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(
    private readonly userFactory: UserFactory,
    @Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, email, nickname, thumbnail, about, password } = command

    const [id, profileId, existUser] = await Promise.all([
      this.userRepository.newId(),
      this.userRepository.newId(),
      this.userRepository.findByEmail(email),
    ])

    if (existUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.')
    }

    const user = this.userFactory.create({
      id,
      profileId,
      username,
      email,
      nickname,
      thumbnail,
      about,
    })

    user.create(password)

    await this.userRepository.save(user)

    user.commit()
  }
}
