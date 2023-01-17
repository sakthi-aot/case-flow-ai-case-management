import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//
import { CasesService } from './services/cases.service';
import { CasesController } from './cases.controller';
import { Cases } from './entities/cases.entity';
import { CasesResolver } from './resolvers/cases.resolver';
import { HelpersModule } from 'src/helper/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cases]), HelpersModule],
  providers: [CasesService, CasesResolver],
  controllers: [CasesController],
  exports: [CasesService]
})
export class CasesModule {}
