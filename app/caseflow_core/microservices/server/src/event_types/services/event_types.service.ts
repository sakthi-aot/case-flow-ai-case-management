import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventTypeInput } from '../dto/create-event_type.input';
import { UpdateEventTypeInput } from '../dto/update-event_type.input';
import { EventTypes } from '../entities/event_type.entity';

/**
 *  Service For event type
 */
@Injectable()
export class EventTypesService {
  constructor(
    @InjectRepository(EventTypes)
    private eventTypeRepository: Repository<EventTypes>,
  ) {}

  /**
   * Create Method For Creating New event type
   * @param createEventTypeInput
   * @returns
   */
  create(createEventTypeInput: CreateEventTypeInput) {
    return 'This action adds a new eventType';
  }
  /**
   * Find All Method for Returning All eventtype
   * @returns
   */
  async findAll(): Promise<EventTypes[]> {
    try {
      return this.eventTypeRepository.find({ relations: ['caseevent'] });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Find One Method For Returning Specific eventtype
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<EventTypes> {
    try {
      if (id) {
        const value = await this.eventTypeRepository.findOne({
          where: {
            id: id,
          },
          relations: ['caseevent'],
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
   * Update eventtype
   * @param id
   * @param updateEventTypeInput
   * @returns
   */
  update(id: number, updateEventTypeInput: UpdateEventTypeInput) {
    return `This action updates a #${id} eventType`;
  }
  /**
   * remove eventtype
   * @param id
   * @returns
   */
  remove(id: number) {
    return `This action removes a #${id} eventType`;
  }
}
