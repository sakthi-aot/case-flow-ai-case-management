import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVersionInput } from '../dto/create-version.input';
import { Versions } from '../entities/version.entity';

@Injectable()
export class VersionsService {
  constructor(
    @InjectRepository(Versions) private verisonRepository: Repository<Versions>,
  ) {}

  async create(createVersionInput: CreateVersionInput): Promise<Versions> {
    try {
      const newVersion = this.verisonRepository.create(createVersionInput);
      return this.verisonRepository.save(newVersion);
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<Versions[]> {
    try {
      return this.verisonRepository.find({
        relations: ['documents'],
        order: {
          id: 'DESC',
        },
      });
    } catch (err) {
      return err;
    }
  }

  async findOne(id: number): Promise<Versions> {
    try {
      if (id) {
        const value = await this.verisonRepository.findOne({
          where: {
            id: id,
          },

          relations: ['documents'],
          order: {
            id: 'DESC',
          },
        });
        if (value) return value;

        throw new NotFoundException(`Record cannot find by id ${id}`);
      }
      throw new BadRequestException("request doesn't have any id");
    } catch (err) {
      return err;
    }
  }

  async findDocument(id: number): Promise<Versions> {
    try {
      if (id) {
        const value = await this.verisonRepository.findOne({
          where: {
            id: id,
          },
          relations: ['documents'],
          order: {
            id: 'DESC',
          },
        });
        if (value) return value;

        throw new NotFoundException(`Record cannot find by id ${id}`);
      }
      throw new BadRequestException("request doesn't have any id");
    } catch (err) {
      return err;
    }
  }
}
