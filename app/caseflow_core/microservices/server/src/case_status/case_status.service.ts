import { Injectable } from '@nestjs/common';
import { CaseStatuses } from './entities/case_status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CaseStatusService {

  constructor(
    @InjectRepository(CaseStatuses) private statusRepository: Repository<CaseStatuses>
  ) {}
  
  findAll() {
    try {
      return this.statusRepository.find({relations:["casestype"]});
    } catch (err) {
      console.log(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} caseStatus`;
  }


}


