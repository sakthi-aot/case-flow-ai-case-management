import { Test, TestingModule } from '@nestjs/testing';
import { CaseNotesService } from './case_notes.service';

describe('CaseNotesService', () => {
  let service: CaseNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseNotesService],
    }).compile();

    service = module.get<CaseNotesService>(CaseNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
