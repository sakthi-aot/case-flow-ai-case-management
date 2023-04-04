import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//

import { CaseEventsService } from './services/case_events.service';
import { CaseEventsResolver } from './resolvers/case_events.resolver';
import { CaseEvents } from './entities/case_event.entity';
import { EventTypesModule } from 'src/event_types/event_types.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseEvents]),EventTypesModule],
  providers: [CaseEventsResolver, CaseEventsService],
  exports:[CaseEventsService]
})
export class CaseEventsModule {}
