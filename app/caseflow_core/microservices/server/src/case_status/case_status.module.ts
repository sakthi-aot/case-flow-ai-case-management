import { Module } from '@nestjs/common';
import { CaseStatusService } from './case_status.service';
import { CaseStatusResolver } from './case_status.resolver';
import { CaseStatuses } from './entities/case_status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CaseStatuses]),],
  providers: [CaseStatusResolver, CaseStatusService]
})
export class CaseStatusModule {}
