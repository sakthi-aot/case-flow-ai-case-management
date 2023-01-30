import { Module } from '@nestjs/common';
import { CaseTypesService } from './case_types.service';
import { CaseTypesResolver } from './case_types.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseTypes } from './entities/case_type.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CaseTypes]),],
  providers: [CaseTypesResolver, CaseTypesService]
})
export class CaseTypesModule {}
