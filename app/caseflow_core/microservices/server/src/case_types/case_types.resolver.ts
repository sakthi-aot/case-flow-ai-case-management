import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseTypesService } from './case_types.service';
import { CaseTypes } from './entities/case_type.entity';
import { CreateCaseTypeInput } from './dto/create-case_type.input';
import { UpdateCaseTypeInput } from './dto/update-case_type.input';

@Resolver(() => CaseTypes)
export class CaseTypesResolver {
  constructor(private readonly caseTypesService: CaseTypesService) {}

  @Mutation(() => CaseTypes)
  createCaseType(
    @Args('createCaseTypeInput') createCaseTypeInput: CreateCaseTypeInput,
  ) {
    return this.caseTypesService.create(createCaseTypeInput);
  }

  @Query(() => [CaseTypes], { name: 'getCaseTypes' })
  findAll() {
    return this.caseTypesService.findAll();
  }

  @Query(() => CaseTypes, { name: 'caseType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseTypesService.findOne(id);
  }

  @Mutation(() => CaseTypes)
  updateCaseType(
    @Args('updateCaseTypeInput') updateCaseTypeInput: UpdateCaseTypeInput,
  ) {
    return this.caseTypesService.update(
      updateCaseTypeInput.id,
      updateCaseTypeInput,
    );
  }

  @Mutation(() => CaseTypes)
  removeCaseType(@Args('id', { type: () => Int }) id: number) {
    return this.caseTypesService.remove(id);
  }
}
