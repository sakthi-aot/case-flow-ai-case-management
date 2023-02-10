import { Module } from '@nestjs/common';
import { EventTypesService } from './services/event_types.service';
import { EventTypesResolver } from './resolvers/event_types.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTypes } from './entities/event_type.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EventTypes])],
  providers: [EventTypesResolver, EventTypesService],
  exports:[EventTypesService]
})
export class EventTypesModule {}
