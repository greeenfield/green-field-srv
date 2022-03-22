import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { injectionToken } from '#shared/enum/injection-token'

import { CreateUserCommand } from '#modules/user/application/commands/implement/create-user.command'
import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(
    private readonly userFactory: UserFactory,
    @Inject(injectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, email, nickname, thumbnail, about, password } = command

    const [id, profileId] = await Promise.all([this.userRepository.newId(), this.userRepository.newId()])

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
