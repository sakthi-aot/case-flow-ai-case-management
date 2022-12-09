import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//_____________________Custom Imports_____________________//
import { Cases } from './cases.entity';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private caseRepository: Repository<Cases>,
  ) {}

  async findAll(): Promise<Cases[]> {
    return this.caseRepository.find();
  }

  async createCase(createCaseInput: CreateCaseInput): Promise<Cases> {
    try {
      const newCase = this.caseRepository.create(createCaseInput);
      return this.caseRepository.save(newCase);
    } catch (err) {
      console.log(err);
    }
  }

  async findOne({ id }: { id: number }): Promise<Cases> {
    return this.caseRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateCaseInput: UpdateCaseInput) {
    let cases: Cases = this.caseRepository.create(updateCaseInput);
    cases.id = id;
    return this.caseRepository.save(cases);
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
