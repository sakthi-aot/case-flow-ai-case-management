import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//
import { DocumentsService } from './services/documents.service';
import { DocumentsResolver } from './resolvers/documents.resolver';
import { CaseDocuments } from './entities/documents.entity';
import { DocumentsController } from './documents.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { CasesResolver } from './resolvers/cases.resolver';
import { VersionsModule } from 'src/versions/versions.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseDocuments]), HelpersModule,VersionsModule],
  providers: [DocumentsService, DocumentsResolver,CasesResolver],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
