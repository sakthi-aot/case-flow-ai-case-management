import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseHistoryService } from './case_history.service';
import { CaseHistory } from './entities/case_history.entity';
import { CreateCaseHistoryInput } from './dto/create-case_history.input';
import { UpdateCaseHistoryInput } from './dto/update-case_history.input';

@Resolver(() => CaseHistory)
export class CaseHistoryResolver {
  constructor(private readonly caseHistoryService: CaseHistoryService) {}

  @Mutation(() => CaseHistory)
  createCaseHistory(@Args('createCaseHistoryInput') createCaseHistoryInput: CreateCaseHistoryInput) {
    return this.caseHistoryService.create(createCaseHistoryInput);
  }

  @Query(() => [CaseHistory], { name: 'caseHistory' })
  findAll() {
    return this.caseHistoryService.findAll();
  }

  @Query(() => CaseHistory, { name: 'caseHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseHistoryService.findOne(id);
  }

  @Mutation(() => CaseHistory)
  updateCaseHistory(@Args('updateCaseHistoryInput') updateCaseHistoryInput: UpdateCaseHistoryInput) {
    return this.caseHistoryService.update(updateCaseHistoryInput.id, updateCaseHistoryInput);
  }

  @Mutation(() => CaseHistory)
  removeCaseHistory(@Args('id', { type: () => Int }) id: number) {
    return this.caseHistoryService.remove(id);
  }
}
