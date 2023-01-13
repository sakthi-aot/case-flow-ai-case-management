import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Like } from 'typeorm';
import { AuthGuard, RoleGuard, RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

//_____________________Custom Imports_____________________//
import { Cases } from '../entities/cases.entity';
import {casesResponse} from '../entities/cases_response.entity';
import { CreateCaseInput } from '../dto/create-case.input';
import { UpdateCaseInput } from '../dto/update-case.input';
import { CaseHistoryService } from 'src/case_history/services/case_history.service';
import { CaseHistory } from 'src/case_history/entities/case_history.entity';
import { FetchArgs } from '../dto/fetch.input';

/**
 *  Service For Cases
 */
@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private caseRepository: Repository<Cases>,
  ) {}

  /**
   * Find All Method for Returning All Cases with pagination
   * @param args
   * @returns
   */
  async findAll(
    args: FetchArgs = { skip: 0, take: 5 },
  ): Promise<casesResponse> {
    try {
    const [Cases, totalCount] = await Promise.all([
      this.caseRepository.find({
        take: args.take,
        skip: args.skip,
      }),
      this.caseRepository.count(),
    ]);
    return { Cases, totalCount };
  } catch (err) {
    console.log(err);
  }
  }

  /**
   * find last 10 record from cases
   * @returns
   */
  async findAllWithLimit(): Promise<Cases[]> {
    try {
      return this.caseRepository.find({
        take: 10,
        order: {
          id: 'DESC',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Create Method For Creating New Cases
   * @param createCaseInput
   * @returns
   */
  // @Roles({ roles: ['manage-account'], mode: RoleMatchingMode.ANY })
  async createCase(createCaseInput: CreateCaseInput): Promise<Cases> {
    try {
      const newCase = this.caseRepository.create(createCaseInput);
      return this.caseRepository.save(newCase);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Find One Method For Returning Specific Case
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<Cases> {
    try {
    if (id) {
      const value = await this.caseRepository.findOne({
        where: {
          id: id,
        },
        relations: [
          'casehistory',
          'casehistory.event',
          'casehistory.event.eventtype',
        ],
      });
      if (value) return value;

      throw new NotFoundException(`Record cannot find by id ${id}`);
    }
    throw new BadRequestException("request doesn't have any id");
  } catch (err) {
    console.log(err);
  }
  }

  /**
   *  Update Cases
   * @param id 
   * @param updateCaseInput 
   * @returns 
   */
  async updateCase(id: number, updateCaseInput: UpdateCaseInput) {
    try {
    return await this.caseRepository.update(id, updateCaseInput).then(() => {
      return this.findOne(id).catch((err) => {
        throw new HttpException(err.response, HttpStatus.NOT_FOUND);
      });
    });
  } catch (err) {
    console.log(err);
  }
  }
/**
 * method for remove cases
 * @param id 
 * @returns 
 */
  async remove(id: number) {
    try {
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
  searchCase(searchField, searchColumn) {
    try {
      if (searchColumn) {
        switch (searchColumn) {
          case 'Description': {
            return this.caseRepository
              .createQueryBuilder('table')
              .where('LOWER(table.desc) LIKE :title', {
                title: `%${searchField.toLowerCase()}%`,
              })
              .getMany();
          }
          default:
            return this.caseRepository
              .createQueryBuilder('table')
              .where('LOWER(table.name) LIKE :title', {
                title: `%${searchField.toLowerCase()}%`,
              })
              .getMany();
        }
      } else {
        return new HttpException('select a field', HttpStatus.BAD_REQUEST);
      }
    } catch {
      throw new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

