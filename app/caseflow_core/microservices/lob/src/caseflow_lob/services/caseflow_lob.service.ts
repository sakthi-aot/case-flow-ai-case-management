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
import { FetchArgs } from '../dto/fetch.input';
import { CaseflowLobResponse } from '../entities/cases_response.entity';

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
   * Find All Method for Returning All lob with pagination
   * @param args
   * @returns
   */
    async findAll(
      args: FetchArgs = { skip: 0, take: 5 }): Promise<CaseflowLobResponse> {
      try {
      const [CaseflowLob, totalCount] = await Promise.all([
        this.caseLobRepository.find({
          take: args.take,
          skip: args.skip,
          order: {
            id: 'DESC',
          },
      }),
        this.caseLobRepository.count(),
      ]);
      return { CaseflowLob, totalCount };
    } catch (err) {
      console.log(err);
    }
    }


      /**
   * method for serach cases
   * @param searchField 
   * @param searchColumn 
   * @returns 
   */
  
   async searchCaseflowLob(searchField,searchColumn,skip,take){   
    try{
    if(searchColumn ){
      if(searchField.length !== 0){
        switch(searchColumn){ 
          case 'policyNumber': {
            const [CaseflowLob,totalCount] =await this.caseLobRepository.createQueryBuilder("table")
            .where("table.policyNumber = :policyNumber", { policyNumber:searchField }).orderBy({'table.id': 'DESC'}).take(take).skip(skip)
            .getManyAndCount()
            return  {CaseflowLob,totalCount};
          }
          default :
           const [CaseflowLob,totalCount] = await  (this.caseLobRepository.createQueryBuilder("table")
          .orderBy({'table.id': 'DESC'}).take(take).skip(skip)
          .getManyAndCount())
          return {CaseflowLob,totalCount}
        }

      }else{
        const [CaseflowLob,totalCount] = await  (this.caseLobRepository.createQueryBuilder("table")
          .orderBy({'table.id': 'DESC'}).take(take).skip(skip)
          .getManyAndCount())
          return {CaseflowLob,totalCount}
      }
    }
    else{
      return  new HttpException("select a field", HttpStatus.BAD_REQUEST)
    }

    }
    catch(err){
      throw new HttpException("something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)
    }

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
