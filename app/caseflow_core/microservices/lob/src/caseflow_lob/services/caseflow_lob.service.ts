import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseflowLob } from '../entities/caseflow_lob.entity';
import { CreateCaseflowLobInput } from '../dto/create-caseflow-lob.input';
import { UpdateCaseflowLobInput } from '../dto/update-caseflow-lob.input';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class CaseflowLobService {
  constructor(
    @InjectRepository(CaseflowLob)
    private caseLobRepository: Repository<CaseflowLob>,
  ) {}

  //   async findOne(caseId: number): Promise<CaseflowLob> {
  //     if(caseId){
  //       const value = await this.caseLobRepository.findOne({
  //         where: {
  //           caseId: caseId,
  //         },
  //       });
  //       if(value)return value
  //       throw new NotFoundException(`Record cannot find by id ${caseId}`);
  //     }
  //     throw new BadRequestException("request doesn't have any id")

  // }

  async findById(id: number): Promise<CaseflowLob> {
    if (id) {
      const value = await this.caseLobRepository.findOne({
        where: {
          id: id,
        },
      });
      if (value) return value;
      throw new NotFoundException(`Record cannot find by id ${id}`);
    }
    throw new BadRequestException("request doesn't have any id");
  }

  /**
   * Create Method For Creating New Cases
   * @param createCaseInput
   * @returns
   */
  // @Roles({ roles: ['manage-account'], mode: RoleMatchingMode.ANY })
  async createCaseflowLob(
    createCaseflowLobInput: CreateCaseflowLobInput,
  ): Promise<CaseflowLob> {
    try {
      const newCaseflowLob = this.caseLobRepository.create(
        createCaseflowLobInput,
      );
      return this.caseLobRepository.save(newCaseflowLob);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   *  Update lob
   * @param updateCaseflowLobInput
   * @returns
   */
  async updateCaseflowLob(
    id: number,
    updateCaseflowLobInput: UpdateCaseflowLobInput,
  ): Promise<CaseflowLob> {
    try {
      delete updateCaseflowLobInput.id;
      return await this.caseLobRepository
        .update(id, updateCaseflowLobInput)
        .then(() => {
          return this.findById(id).catch((err) => {
            throw new HttpException(err.response, HttpStatus.NOT_FOUND);
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * method for remove lob
   * @param id
   * @returns
   */
  async remove(id: number) {
    try {
      let caseData = this.findById(id)
      if (caseData) {
        let ret = await this.caseLobRepository.delete(id);
        if (ret.affected === 1) {
          return caseData;
        }
      }
      throw new NotFoundException(`Record cannot find by id ${id}`);
    } catch (err) {
      console.log(err);
    }
  }
}
