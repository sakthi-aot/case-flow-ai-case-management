import { Module } from '@nestjs/common';
import { CaseNotesService } from './case_notes.service';
import { CaseNotesResolver } from './case_notes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseNotes } from './entities/case_note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseNotes])],

  providers: [CaseNotesResolver, CaseNotesService]
})
export class CaseNotesModule {}
