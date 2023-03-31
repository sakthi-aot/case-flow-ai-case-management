import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

//Custom - imports //

import { CaseflowLob } from '../entities/caseflow_lob.entity';
import { CreateCaseflowLobInput } from '../dto/create-caseflow-lob.input';
import { UpdateCaseflowLobInput } from '../dto/update-caseflow-lob.input';
import { FetchArgs } from '../dto/fetch.input';
import { CaseflowLobResponse } from '../entities/cases_response.entity';

@Injectable()
export class CaseflowLobService {
  constructor(
    @InjectRepository(CaseflowLob)
    private caseLobRepository: Repository<CaseflowLob>,
  ) {}

  async findById(id: number): Promise<CaseflowLob> {
    try {
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
    } catch (error) {
      return error;
    }
  }

  async findAll(
    args: FetchArgs = { skip: 0, take: 5 },
  ): Promise<CaseflowLobResponse> {
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
      return err;
    }
  }

  async searchCaseflowLob(
    searchField,
    searchColumn,
    skip,
    take,
    fromDate,
    toDate,
  ) {
    try {
      if (fromDate === '') fromDate = '2000-01-01';

      if (searchColumn) {
        if (searchField.length !== 0) {
          switch (searchColumn) {
            case 'policyNumber': {
              const [CaseflowLob, totalCount] = await this.caseLobRepository
                .createQueryBuilder('table')
                .where('table.policyNumber = :policyNumber', {
                  policyNumber: searchField,
                })
                .andWhere('table.createdDate >= :start_at', {
                  start_at: fromDate,
                })
                .andWhere('table.createdDate <= :end_at', { end_at: toDate })

                .orderBy({ 'table.id': 'DESC' })
                .take(take)
                .skip(skip)
                .getManyAndCount();
              return { CaseflowLob, totalCount };
            }
            default:
              const [CaseflowLob, totalCount] = await this.caseLobRepository
                .createQueryBuilder('table')
                .andWhere('table.createdDate >= :start_at', {
                  start_at: fromDate,
                })
                .andWhere('table.createdDate <= :end_at', { end_at: toDate })
                .orderBy({ 'table.id': 'DESC' })
                .take(take)
                .skip(skip)
                .getManyAndCount();
              return { CaseflowLob, totalCount };
          }
        } else {
          const [CaseflowLob, totalCount] = await this.caseLobRepository
            .createQueryBuilder('table')
            .andWhere('table.createdDate >= :start_at', { start_at: fromDate })
            .andWhere('table.createdDate <= :end_at', { end_at: toDate })
            .orderBy({ 'table.id': 'DESC' })
            .take(take)
            .skip(skip)

            .getManyAndCount();
          return { CaseflowLob, totalCount };
        }
      } else {
        return new HttpException('select a field', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      return new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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
      return err;
    }
  }

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
      return err;
    }
  }

  async remove(id: number) {
    try {
      let caseData = this.findById(id);
      if (caseData) {
        let ret = await this.caseLobRepository.delete(id);
        if (ret.affected === 1) {
          return caseData;
        }
      }
      throw new NotFoundException(`Record cannot find by id ${id}`);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
