import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { CaseDocuments } from './documents.entity';
import { DocumentsController } from './documents.controller';
import { HelpersModule } from 'src/helpers/helpers.module';
import { CasesResolver } from './cases.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CaseDocuments]), HelpersModule],
  providers: [DocumentsService, DocumentsResolver,CasesResolver],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
