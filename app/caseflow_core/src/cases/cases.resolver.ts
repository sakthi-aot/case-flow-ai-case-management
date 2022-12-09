import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

//_____________________Custom Imports_____________________//

import { Cases } from './cases.entity';
import { CasesService } from './cases.service';
import { CreateCaseInput } from './dto/create-case.input';
import { UpdateCaseInput } from './dto/update-case.input';

@Resolver((of) => Cases)
export class CasesResolver {
  constructor(private casesService: CasesService) {}

  //_____________________Query_____________________//

  @Query((returns) => [Cases])
  getCase(@Args('id', { type: () => Int }) id: number): Promise<Cases> {
    return this.casesService.findOne({ id });
  }
  @Query((returns) => [Cases])
  case(): Promise<Cases[]> {
    return this.casesService.findAll();
  }

  //_____________________Mutation_____________________//

  @Mutation((returns) => Cases)
  createCase(
    @Args('createCaseInput') createCaseInput: CreateCaseInput,
  ): Promise<Cases> {
    return this.casesService.createCase(createCaseInput);
  }

  @Mutation(() => Cases)
  updateCases(@Args('cases') updateCaseInput: UpdateCaseInput) {
    return this.casesService.update(updateCaseInput.id, updateCaseInput);
  }

  @Mutation(() => Cases)
  removeCases(@Args('id') id: number) {
    return this.casesService.remove(id);
  }
}
