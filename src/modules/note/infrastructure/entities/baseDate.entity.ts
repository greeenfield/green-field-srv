import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class BaseDate {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date
}
