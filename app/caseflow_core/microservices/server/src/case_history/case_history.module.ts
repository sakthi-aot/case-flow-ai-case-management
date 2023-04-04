import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//

import { CaseHistoryService } from './services/case_history.service';
import { CaseHistoryResolver } from './resolvers/case_history.resolver';
import { CasesModule } from '../cases/cases.module';
import { CaseHistory } from './entities/case_history.entity';
import { CaseEventsModule } from '../case_events/case_events.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseHistory]),CasesModule,CaseEventsModule],
  providers: [CaseHistoryResolver, CaseHistoryService]

})
export class CaseHistoryModule {}
