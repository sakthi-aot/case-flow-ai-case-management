import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseStatusService } from './case_status.service';
import { CaseStatuses } from './entities/case_status.entity';


@Resolver(() => CaseStatuses)
export class CaseStatusResolver {
  constructor(private readonly caseStatusService: CaseStatusService) {}

  @Query(() => [CaseStatuses], { name: 'getCaseStatuses' })
  findAll() {
    return this.caseStatusService.findAll();
  }

  @Query(() => CaseStatuses, { name: 'getSingleCaseStatus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseStatusService.findOne(id);
  }

 
}
