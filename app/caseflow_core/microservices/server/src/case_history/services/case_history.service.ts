import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cases } from 'src/cases/entities/cases.entity';
import { CasesModule } from 'src/cases/cases.module';
import { CasesService } from 'src/cases/services/cases.service';
import { CaseEventsService } from 'src/case_events/services/case_events.service';
import { CaseEvents } from 'src/case_events/entities/case_event.entity';
import { Repository } from 'typeorm';
import { CreateCaseHistoryInput } from '../dto/create-case_history.input';
import { UpdateCaseHistoryInput } from '../dto/update-case_history.input';
import { CaseHistory } from '../entities/case_history.entity';

/**
 *  Service For Casehistory
 */
@Injectable()
export class CaseHistoryService {
  constructor(
    @InjectRepository(CaseHistory)
    private caseHistoryRepository: Repository<CaseHistory>,
    private caseEventService: CaseEventsService,
  ) {}

  /**
   * Find All Method for Returning All casehistory
   * @param args
   * @returns
   */
  async findAll(): Promise<CaseHistory[]> {
    try {
      return this.caseHistoryRepository.find({
        relations: ['event', 'event.eventtype'],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Create Method For Creating New Casehistory
   * @param createCaseHistoryInput
   * @returns
   */
  async create(createCaseHistoryInput: CreateCaseHistoryInput) {
    try {
      const CaseHistoryInput = this.caseHistoryRepository.create(
        createCaseHistoryInput,
      );
      const data = await this.caseHistoryRepository.save(CaseHistoryInput);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Find One Method For Returning Specific Casehistory
   * @param id
   * @returns
   */

  async findOne(id: number): Promise<CaseHistory> {
    try {
      if (id) {
        const value = await this.caseHistoryRepository.findOne({
          where: {
            id: id,
          },
          relations: ['event', 'event.eventtype'],
        });
        if (value) return value;
        throw new NotFoundException(`Record cannot find by id ${id}`);
      }
      throw new BadRequestException("request doesn't have any id");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Update casehistory
   * @param id
   * @param updateCaseHistoryInput
   * @returns
   */
  update(id: number, updateCaseHistoryInput: UpdateCaseHistoryInput) {
    return `This action updates a #${id} caseHistory`;
  }

  /**
   * remove casehistory
   * @param id
   * @returns
   */
  remove(id: number) {
    return `This action removes a #${id} caseHistory`;
  }

  /**
   * method for fetch case event
   * @param id
   * @returns
   */
  async getCaseEvents(id: number): Promise<CaseEvents> {
    try {
      return this.caseEventService.findOne(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
