import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseflowLob } from '../entities/caseflow_lob.entity';

@Injectable()
export class CaseflowLobService {
  constructor(
    @InjectRepository(CaseflowLob) private caseLobRepository: Repository<CaseflowLob>,
  ) {}


  async findOne(caseId: number): Promise<CaseflowLob> {
    if(caseId){
      const value = await this.caseLobRepository.findOne({
        where: {
          caseId: caseId,
        },
      });
      if(value)return value
      throw new NotFoundException(`Record cannot find by id ${caseId}`);
    }
    throw new BadRequestException("request doesn't have any id")

}

}
