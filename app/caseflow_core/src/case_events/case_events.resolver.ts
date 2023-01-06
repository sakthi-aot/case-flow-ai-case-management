import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseEventsService } from './case_events.service';
import { CaseEvents } from './entities/case_event.entity';
import { CreateCaseEventInput } from './dto/create-case_event.input';
import { UpdateCaseEventInput } from './dto/update-case_event.input';

@Resolver(() => CaseEvents)
export class CaseEventsResolver {
  constructor(private readonly caseEventsService: CaseEventsService) {}

  @Mutation(() => CaseEvents)
  createCaseEvent(@Args('createCaseEventInput') createCaseEventInput: CreateCaseEventInput) {
    return this.caseEventsService.create(createCaseEventInput);
  }

  @Query(() => [CaseEvents], { name: 'caseEvents' })
  findAll() {
    return this.caseEventsService.findAll();
  }

  @Query(() => CaseEvents, { name: 'caseEvent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseEventsService.findOne(id);
  }

  @Mutation(() => CaseEvents)
  updateCaseEvent(@Args('updateCaseEventInput') updateCaseEventInput: UpdateCaseEventInput) {
    return this.caseEventsService.update(updateCaseEventInput.id, updateCaseEventInput);
  }

  @Mutation(() => CaseEvents)
  removeCaseEvent(@Args('id', { type: () => Int }) id: number) {
    return this.caseEventsService.remove(id);
  }
}
