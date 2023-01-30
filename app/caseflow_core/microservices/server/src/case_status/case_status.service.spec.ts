import { Test, TestingModule } from '@nestjs/testing';
import { CaseStatusService } from './case_status.service';

describe('CaseStatusService', () => {
  let service: CaseStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseStatusService],
    }).compile();

    service = module.get<CaseStatusService>(CaseStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
