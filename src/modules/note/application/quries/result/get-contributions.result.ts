import { IQueryResult } from '@nestjs/cqrs'
import { Expose } from 'class-transformer'

export class GetContributionsResult extends Array<Contribution> implements IQueryResult {}

export class Contribution {
  @Expose({ name: 'note_id' })
  id: string

  @Expose({ name: 'note_title' })
  title: string

  @Expose({ name: 'note_created_at' })
  createdAt: Date
}
