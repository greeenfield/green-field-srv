import { Inject } from '@nestjs/common'
import { ICommandHandler } from '@nestjs/cqrs'

import { CreateUserCommand } from '#modules/user/application/commands/implement/create-user.command'
import { UserRepository } from '#modules/user/domain/repository'

export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userRepository.findById(command.userId)
    return
  }
}
