import { Module } from '@nestjs/common';
import { CaseHistoryService } from './case_history.service';
import { CaseHistoryResolver } from './case_history.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseHistory } from './entities/case_history.entity';
import { CasesService } from 'src/cases/cases.service';
import { CasesModule } from 'src/cases/cases.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseHistory]),CasesModule],
  providers: [CaseHistoryResolver, CaseHistoryService]

})
export class CaseHistoryModule {}
