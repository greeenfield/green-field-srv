import { Inject, NotFoundException } from '@nestjs/common'
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'

import { UserRepository } from '#modules/user/domain/repository'
import { NoteQuery } from '#modules/note/domain/query'
import { GetContributionsQuery } from '#modules/note/application/quries/implement/get-contributions.query'

import { InjectionToken } from '#shared/enum/injection-token'

@QueryHandler(GetContributionsQuery)
export class GetContributionsHandler implements IQueryHandler<GetContributionsQuery, unknown> {
  constructor(
    @Inject(InjectionToken.NOTE_QUERY_REPOSITORY) private readonly noteQuery: NoteQuery,
    @Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetContributionsQuery): Promise<unknown> {
    const { userId, beginDate, endDate } = query

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException()
    }

    const contributions = await this.noteQuery.findContributions(userId, beginDate, endDate)

    return contributions.reduce((acc, c) => {
      const date = new Date(c.createdAt).toDateString()

      delete c.createdAt

      if (acc[date]) {
        acc[date].count = acc[date].count += 1
        acc[date].notes.push(c)

        return acc
      }

      acc[date] = {
        count: 1,
        notes: [c],
      }

      return acc
    }, {})
  }
}
