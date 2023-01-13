import { Module } from '@nestjs/common';
import { CaseflowLobService } from './services/caseflow_lob.service';
import { CaseflowLobResolver } from './resolvers/caseflow_lob.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseflowLob } from './entities/caseflow_lob.entity';



@Module({
  imports: [TypeOrmModule.forFeature([CaseflowLob])],
  providers: [CaseflowLobResolver, CaseflowLobService]
})
export class CaseflowLobModule {}
