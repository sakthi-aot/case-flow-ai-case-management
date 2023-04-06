import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseNoteInput } from './dto/create-case_note.input';
import { UpdateCaseNoteInput } from './dto/update-case_note.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseNotes } from './entities/case_note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaseNotesService {

  constructor(
    @InjectRepository(CaseNotes)
    private caseNoteRepository: Repository<CaseNotes>,
  ) {}

  async create(createCaseNoteInput: CreateCaseNoteInput) {
    try {
      const newCaseNote =
        this.caseNoteRepository.create(createCaseNoteInput);
      const data = await this.caseNoteRepository.save(newCaseNote);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all caseNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caseNote`;
  }
  async findByCaseId(id: number) {
    try{

    const value = await this.caseNoteRepository.find({
      where: {
        caseid: id,
      },  
    });
    if (value) return value;
    throw new NotFoundException(`Record cannot find by id ${id}`);
    
  }
  catch (error) {
    console.log(error);
    throw error;
  }
  }

  update(id: number, updateCaseNoteInput: UpdateCaseNoteInput) {
    return `This action updates a #${id} caseNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} caseNote`;
  }
}