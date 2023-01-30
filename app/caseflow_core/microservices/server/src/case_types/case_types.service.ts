import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCaseTypeInput } from './dto/create-case_type.input';
import { UpdateCaseTypeInput } from './dto/update-case_type.input';
import { CaseTypes } from './entities/case_type.entity';

@Injectable()
export class CaseTypesService {

  constructor(
    @InjectRepository(CaseTypes) private caseTypesRepository: Repository<CaseTypes>
  ) {}
  
  create(createCaseTypeInput: CreateCaseTypeInput) {
    return 'This action adds a new caseType';
  }

  findAll() {
    try {
      return this.caseTypesRepository.find({});
    } catch (err) {
      console.log(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} caseType`;
  }

  update(id: number, updateCaseTypeInput: UpdateCaseTypeInput) {
    return `This action updates a #${id} caseType`;
  }

  remove(id: number) {
    return `This action removes a #${id} caseType`;
  }
}
