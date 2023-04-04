import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//

import { EventTypesService } from './services/event_types.service';
import { EventTypesResolver } from './resolvers/event_types.resolver';
import { EventTypes } from './entities/event_type.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EventTypes])],
  providers: [EventTypesResolver, EventTypesService],
  exports:[EventTypesService]
})
export class EventTypesModule {}
