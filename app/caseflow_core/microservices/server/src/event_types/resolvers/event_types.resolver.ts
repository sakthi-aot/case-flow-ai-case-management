import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventTypesService } from '../services/event_types.service';
import { EventTypes } from '../entities/event_type.entity';
import { CreateEventTypeInput } from '../dto/create-event_type.input';
import { UpdateEventTypeInput } from '../dto/update-event_type.input';

/**
 * Resolver for eventtype
 */
@Resolver(() => EventTypes)
export class EventTypesResolver {
  constructor(private readonly eventTypesService: EventTypesService) {}

  //_____________________Query_____________________//

  /**
   * Summary :   Query For Fetching all eventtype
   * Created By : Akhila U S
   * @returns
   */

  @Query(() => [EventTypes], { name: 'eventTypes' })
  findAll() {
    return this.eventTypesService.findAll();
  }

  /**
   * Summary :   Query For Fetching eventtype by passing arguments
   * Created By : Akhila U S
   * @param args
   * @returns
   */
  @Query(() => EventTypes, { name: 'eventType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventTypesService.findOne(id);
  }

  //_____________________Mutation_____________________//

  /**
   * Summary : Mutation for Creating event type
   * Created By : Akhila U S
   * @param createEventTypeInput
   * @returns
   */
  @Mutation(() => EventTypes)
  createEventType(
    @Args('createEventTypeInput') createEventTypeInput: CreateEventTypeInput,
  ) {
    return this.eventTypesService.create(createEventTypeInput);
  }
  /**
   * Summary : Mutation for updating eventtype
   * Created By : Akhila U S
   * @param updateEventTypeInput
   * @returns
   */

  @Mutation(() => EventTypes)
  updateEventType(
    @Args('updateEventTypeInput') updateEventTypeInput: UpdateEventTypeInput,
  ) {
    return this.eventTypesService.update(
      updateEventTypeInput.id,
      updateEventTypeInput,
    );
  }
  /**
   * Summary : Mutation for remove eventtype
   * Created By : Akhila U S
   * @param id
   * @returns
   */
  @Mutation(() => EventTypes)
  removeEventType(@Args('id', { type: () => Int }) id: number) {
    return this.eventTypesService.remove(id);
  }
}
