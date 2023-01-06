import { Module } from '@nestjs/common';
import { CaseEventsService } from './case_events.service';
import { CaseEventsResolver } from './case_events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseEvents } from './entities/case_event.entity';
import { CaseHistoryModule } from 'src/case_history/case_history.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseEvents]),CaseHistoryModule],
  providers: [CaseEventsResolver, CaseEventsService]
})
export class CaseEventsModule {}
