import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//_____________________Custom Imports_____________________//

import { CaseStatuses } from './entities/case_status.entity';
@Injectable()
export class CaseStatusService {
  constructor(
    @InjectRepository(CaseStatuses)
    private statusRepository: Repository<CaseStatuses>,
  ) {}

  findAll() {
    try {
      return this.statusRepository.find({ relations: ['casestype'] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} caseStatus`;
  }
}
