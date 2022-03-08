import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { injectionToken } from '#shared/injection-token'

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
    const { username, email, nickname, thumbnail, about } = command

    const user = this.userFactory.create(
      await this.userRepository.generateId(),
      username,
      email,
      nickname,
      thumbnail,
      about,
    )

    await this.userRepository.save(user)

    // user.commit()
  }
}
