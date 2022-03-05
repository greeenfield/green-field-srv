import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'

import { CreateUserCommand } from '#modules/user/application/commands/implement/create-user.command'
import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(private readonly userFactory: UserFactory, private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, nickname, email } = command

    const user = this.userFactory.create(await this.userRepository.generateId(), email, nickname, username)

    await this.userRepository.save(user)

    // user.commit()
  }
}
