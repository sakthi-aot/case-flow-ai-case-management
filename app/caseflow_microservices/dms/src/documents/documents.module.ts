import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { CaseDocuments } from './documents.entity';
import { DocumentsController } from './documents.controller';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseDocuments]), HelpersModule],
  providers: [DocumentsService, DocumentsResolver],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
