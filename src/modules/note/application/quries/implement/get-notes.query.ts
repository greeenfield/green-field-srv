import { IQuery } from '@nestjs/cqrs'

export class GetNotesQuery implements IQuery {
  constructor(readonly offset: number, readonly limit: number, readonly timeframe: number) {}
}
