import { Test, TestingModule } from '@nestjs/testing';
import { CaseNotesResolver } from './case_notes.resolver';
import { CaseNotesService } from './case_notes.service';

describe('CaseNotesResolver', () => {
  let resolver: CaseNotesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseNotesResolver, CaseNotesService],
    }).compile();

    resolver = module.get<CaseNotesResolver>(CaseNotesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
