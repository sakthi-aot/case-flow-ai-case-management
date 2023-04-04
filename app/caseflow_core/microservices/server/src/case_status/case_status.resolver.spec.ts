import { Test, TestingModule } from '@nestjs/testing';
import { CaseStatusResolver } from './case_status.resolver';
import { CaseStatusService } from './case_status.service';

describe('CaseStatusResolver', () => {
  let resolver: CaseStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseStatusResolver, CaseStatusService],
    }).compile();

    resolver = module.get<CaseStatusResolver>(CaseStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
