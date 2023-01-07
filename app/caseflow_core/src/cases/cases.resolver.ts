import { Args, Int, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';

//_____________________Custom Imports_____________________//

import { Cases } from './cases.entity';
import { CasesService } from './cases.service';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';
import { HttpException } from '@nestjs/common/exceptions';


@Resolver((of) => Cases)
export class CasesResolver {
  constructor(private casesService: CasesService) {}

  //_____________________Query_____________________//

  @Query((returns) => Cases)
  getCase(@Args('id', { type: () => Int }) id: number): Promise<Cases> {
    return this.casesService.findOne( id );
  }
  @Query((returns) => [Cases])
  case(): Promise<Cases[]> {
    return this.casesService.findAll();
  }

  @Query((returns) => [Cases] )
  Searchcase(
    @Args('searchField') searchField: string,
    @Args('searchColumn') searchColumn : string,
     ): Promise<Cases[]> | HttpException{

    return this.casesService.searchCase(searchField,searchColumn);
  }

  @Query((returns) => [Cases])
  fetchRecentCase(): Promise<Cases[]> {
    return this.casesService.findAllWithLimit();
  }

  
  //_____________________Mutation_____________________//

  @Mutation((returns) => Cases)
  createCase(
    @Args('createCaseInput') createCaseInput: CreateCaseInput,
  ): Promise<Cases> {
    return this.casesService.createCase(createCaseInput);
  }

  @Mutation(() => Cases)
  updateCase(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
    return this.casesService.updateCase(updateCaseInput.id, updateCaseInput);
  }

  @Mutation(() => Cases)
  removeCase(@Args('id') id: number) {
    return this.casesService.remove(id);
  }

  @ResolveReference()
    resolverefernce(ref:{__typename:number,id:number}){
    return this.casesService.findOne(ref.id)
    }

}
