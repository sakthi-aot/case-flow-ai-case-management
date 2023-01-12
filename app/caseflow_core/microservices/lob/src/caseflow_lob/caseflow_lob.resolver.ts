import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseflowLobService } from './caseflow_lob.service';
import { CaseflowLob } from './entities/caseflow_lob.entity';


@Resolver(() => CaseflowLob)
export class CaseflowLobResolver {
  constructor(private readonly caseflowLobService: CaseflowLobService) {}



  @Query(() => CaseflowLob, { name: 'getLobByCaseId' })
  findOne(@Args('caseId', { type: () => Int }) id: number) {
    return this.caseflowLobService.findOne(id);
  }


}
