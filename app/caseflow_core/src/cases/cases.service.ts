import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard, RoleGuard, RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';

//_____________________Custom Imports_____________________//
import { Cases } from './cases.entity';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private caseRepository: Repository<Cases>,
  ) {}

  async findAll(): Promise<Cases[]> {
    return this.caseRepository.find();
  }

  // @Roles({ roles: ['manage-account'], mode: RoleMatchingMode.ANY })
  async createCase(createCaseInput: CreateCaseInput): Promise<Cases> {
    try {
      const newCase = this.caseRepository.create(createCaseInput);
      return this.caseRepository.save(newCase);
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: number): Promise<Cases> {
      if(id){
        const value = await this.caseRepository.findOne({
          where: {
            id: id,
          },
        });
        if(value)return value
        throw new NotFoundException(`Record cannot find by id ${id}`);
      }
      throw new BadRequestException("request doesn't have any id")

  }

  async updateCase(id: number, updateCaseInput: UpdateCaseInput) {
    return await this.caseRepository
      .update(id, updateCaseInput)
      .then(() => {
        return this.findOne(id).catch((err)=>{
          throw new HttpException(err.response, HttpStatus.NOT_FOUND)
        });
      })
  }

  async remove(id: number) {
    let caseData = this.caseRepository.findOne({
      where: {
        id: id,
      },
    });
    if (caseData) {
      let ret = await this.caseRepository.delete(id);
      if (ret.affected === 1) {
        return caseData;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}
