import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseHistoryService } from '../services/case_history.service';
import { CaseHistory } from '../entities/case_history.entity';
import { CreateCaseHistoryInput } from '../dto/create-case_history.input';
import { UpdateCaseHistoryInput } from '../dto/update-case_history.input';

/**
 * Resolver for casehistory
 */
@Resolver(() => CaseHistory)
export class CaseHistoryResolver {
  constructor(private readonly caseHistoryService: CaseHistoryService) {}

  //_____________________Query_____________________//

  /**
   * Summary :   Query For Fetching all case history
   * Created By : Akhila U S
   * @param args
   * @returns
   */
  @Query(() => [CaseHistory], { name: 'getAllCaseHistory' })
  async findAll() {
    return await this.caseHistoryService.findAll();
  }

  /**
   * Summary :   Query For Fetching casehistory by passing id
   * Created By : Akhila U S
   * @param args
   * @returns
   */

  @Query(() => CaseHistory, { name: 'caseHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseHistoryService.findOne(id);
  }

  //_____________________Mutation_____________________//

  /**
   * Summary : Mutation for Creating Casehistory
   * Created By : Akhila U S
   * @param createCaseHistoryInput
   * @returns
   */
  @Mutation(() => CaseHistory)
  createCaseHistory(
    @Args('createCaseHistoryInput')
    createCaseHistoryInput: CreateCaseHistoryInput,
  ) {
    return this.caseHistoryService.create(createCaseHistoryInput);
  }

  /**
   * Summary : Mutation for updating Casehistory
   * Created By : Akhila U S
   * @param updateCaseHistoryInput
   * @returns
   */

  @Mutation(() => CaseHistory)
  updateCaseHistory(
    @Args('updateCaseHistoryInput')
    updateCaseHistoryInput: UpdateCaseHistoryInput,
  ) {
    return this.caseHistoryService.update(
      updateCaseHistoryInput.id,
      updateCaseHistoryInput,
    );
  }

  /**
   * Mutation for remove Cases
   * @param id
   * @returns
   */
  @Mutation(() => CaseHistory)
  removeCaseHistory(@Args('id', { type: () => Int }) id: number) {
    return this.caseHistoryService.remove(id);
  }

  //_____________________Resolver Reference For GraphQL Federation_____________________//

  // @ResolveField(()=>CaseEvents)
  // event(@Parent() casehistory:CaseHistory){
  //   this.caseHistoryService.getCaseEvents(casehistory.eventId);
  // }
}
