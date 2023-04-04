import { Module } from '@nestjs/common';
import { NatsService } from './nats.service';
import { NatsController } from './nats.controller';

@Module({
  controllers: [NatsController],
  providers: [NatsService]
})
export class NatsModule {}
