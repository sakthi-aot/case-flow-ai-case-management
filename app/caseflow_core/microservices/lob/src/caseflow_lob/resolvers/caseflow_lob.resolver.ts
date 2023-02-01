import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseflowLobService } from '../services/caseflow_lob.service';
import { CaseflowLob } from '../entities/caseflow_lob.entity';
import { CreateCaseflowLobInput } from '../dto/create-caseflow-lob.input';
import { UpdateCaseflowLobInput } from '../dto/update-caseflow-lob.input';
import { FetchArgs } from '../dto/fetch.input';
import { CaseflowLobResponse } from '../entities/cases_response.entity';
import { FetchSearchArgs } from '../dto/fetch-search.input';
import { HttpException } from '@nestjs/common/exceptions';


@Resolver(() => CaseflowLob)
export class CaseflowLobResolver {
  constructor(private readonly caseflowLobService: CaseflowLobService) {}

  @Query(() => CaseflowLob, { name: 'getLobById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseflowLobService.findById(id);
  }

    /**
   * Summary :   Query For Fetching cases by passing arguments
   * Created By : Akhila U S
   * @param args 
   * @returns 
   */

    @Query((returns) =>CaseflowLobResponse,  { name: 'getLobList' } )
    getLobList(@Args() args: FetchArgs): Promise<CaseflowLobResponse> { 
      const output = this.caseflowLobService.findAll(args);     
      return output
    }

      /**
   * Summary :   Query For serach lob
   * Created By : Don basil Peter 
   * @param searchField 
   * @param searchColumn 
   * @returns 
   */
   @Query((returns) => CaseflowLobResponse,  { name: 'searchCaseflowLob' } )
   searchCaseflowLob(
     @Args() args: FetchSearchArgs     
      ): Promise<any> | HttpException{
 
     return this.caseflowLobService.searchCaseflowLob(args.searchField,args.searchColumn,args.skip,args.take);
   }

   

  /**
   * Summary : Mutation for creating lob
   * Created By : Don Basil Peter
   * @param createCaseflowLobInput
   * @returns
   */
  @Mutation(() => CaseflowLob, { name: 'createCaseflowLob' })
  createCaseflowLob(
    @Args('createCaseflowLobInput')
    createCaseflowLobInput: CreateCaseflowLobInput,
  ) {
    return this.caseflowLobService.createCaseflowLob(createCaseflowLobInput);
  }

  /**
   * Summary : Mutation for updating lob
   * Created By :  Don Basil Peter
   * @param updateCaseflowLobInput
   * @returns
   */
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

  /**
   * Summary : Mutation for remove lob
   * Created By : Don Basil Peter
   * @param id
   * @returns
   */
  @Mutation(() => CaseflowLob, {name: "removeCaseflowLob"})
  removeCaseflowLob(@Args('id') id: number) {
    return this.caseflowLobService.remove(id);
  }

  
}
