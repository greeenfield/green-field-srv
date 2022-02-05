import { PrimaryColumn, CreateDateColumn } from 'typeorm'

export class BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
