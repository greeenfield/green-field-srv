import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ type: 'timestamptz', default: new Date() })
  createdAt: Date = new Date()

  @UpdateDateColumn({ type: 'timestamptz', default: new Date() })
  updatedAt: Date = new Date()
}
