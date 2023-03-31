import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FetchArgs } from '../dto/fetch.input';
import { HttpException } from '@nestjs/common/exceptions';

//Custom - imports //

import { CaseflowLobService } from '../services/caseflow_lob.service';
import { CaseflowLob } from '../entities/caseflow_lob.entity';
import { CreateCaseflowLobInput } from '../dto/create-caseflow-lob.input';
import { UpdateCaseflowLobInput } from '../dto/update-caseflow-lob.input';
import { CaseflowLobResponse } from '../entities/cases_response.entity';
import { FetchSearchArgs } from '../dto/fetch-search.input';

@Resolver(() => CaseflowLob)
export class CaseflowLobResolver {
  constructor(private readonly caseflowLobService: CaseflowLobService) {}

  @Query(() => CaseflowLob, { name: 'getLobById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseflowLobService.findById(id);
  }

  @Query((returns) => CaseflowLobResponse, { name: 'getLobList' })
  getLobList(@Args() args: FetchArgs): Promise<CaseflowLobResponse> {
    const output = this.caseflowLobService.findAll(args);
    return output;
  }

  @Query((returns) => CaseflowLobResponse, { name: 'searchCaseflowLob' })
  searchCaseflowLob(
    @Args() args: FetchSearchArgs,
  ): Promise<any> | HttpException {
    return this.caseflowLobService.searchCaseflowLob(
      args.searchField,
      args.searchColumn,
      args.skip,
      args.take,
      args.fromDate,
      args.toDate,
    );
  }

  @Mutation(() => CaseflowLob, { name: 'createCaseflowLob' })
  createCaseflowLob(
    @Args('createCaseflowLobInput')
    createCaseflowLobInput: CreateCaseflowLobInput,
  ) {
    return this.caseflowLobService.createCaseflowLob(createCaseflowLobInput);
  }

  @Mutation(() => CaseflowLob, { name: 'updateCaseflowLob' })
  updateCaseflowLob(
    @Args('updateCaseflowLobInput')
    updateCaseflowLobInput: UpdateCaseflowLobInput,
  ) {
    return this.caseflowLobService.updateCaseflowLob(
      updateCaseflowLobInput.id,
      updateCaseflowLobInput,
    );
  }

  @Mutation(() => CaseflowLob, { name: 'removeCaseflowLob' })
  removeCaseflowLob(@Args('id') id: number) {
    return this.caseflowLobService.remove(id);
  }
}
