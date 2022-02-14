import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Note } from '../../app/notes/infrastructure/entities/note.entity'
import { NoteQueryRepository } from './note.repository'

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    private readonly noteQueryRepository: NoteQueryRepository,
  ) {}

  async findAll(): Promise<Note[]> {
    return await this.noteQueryRepository.findAll()
  }
}
