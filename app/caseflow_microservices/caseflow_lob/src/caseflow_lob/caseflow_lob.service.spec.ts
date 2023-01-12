import { Test, TestingModule } from '@nestjs/testing';
import { CaseflowLobService } from './caseflow_lob.service';

describe('CaseflowLobService', () => {
  let service: CaseflowLobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseflowLobService],
    }).compile();

    service = module.get<CaseflowLobService>(CaseflowLobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
