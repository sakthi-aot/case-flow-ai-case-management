import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Cases } from './cases.entity';
import { CasesResolver } from './cases.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Cases])],
  providers: [CasesService, CasesResolver],
  controllers: [CasesController],
})
export class CasesModule {}
