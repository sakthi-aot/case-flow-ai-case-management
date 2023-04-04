import { Test, TestingModule } from '@nestjs/testing';
import { NatsController } from './nats.controller';
import { NatsService } from './nats.service';

describe('NatsController', () => {
  let controller: NatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NatsController],
      providers: [NatsService],
    }).compile();

    controller = module.get<NatsController>(NatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
