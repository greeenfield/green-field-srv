import { IQuery } from '@nestjs/cqrs'

export class GetContributionsQuery implements IQuery {
  constructor(readonly userId: string, readonly beginDate: string, readonly endDate: string) {}
}
