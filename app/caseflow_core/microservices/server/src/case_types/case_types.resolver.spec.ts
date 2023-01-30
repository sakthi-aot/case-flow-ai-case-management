import { Test, TestingModule } from '@nestjs/testing';
import { CaseTypesResolver } from './case_types.resolver';
import { CaseTypesService } from './case_types.service';

describe('CaseTypesResolver', () => {
  let resolver: CaseTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseTypesResolver, CaseTypesService],
    }).compile();

    resolver = module.get<CaseTypesResolver>(CaseTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
