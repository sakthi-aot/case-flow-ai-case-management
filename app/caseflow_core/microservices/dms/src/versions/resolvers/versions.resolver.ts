import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VersionsService } from '../services/versions.service';
import { Versions } from '../entities/version.entity';
import { CreateVersionInput } from '../dto/create-version.input';
import { UpdateVersionInput } from '../dto/update-version.input';

@Resolver(() => Versions)
export class VersionsResolver {
  constructor(private readonly versionsService: VersionsService) {}

  //_____________________Query_____________________//

  @Query(() => [Versions], { name: 'getAllversions' })
  findAll() {
    return this.versionsService.findAll();
  }

  @Query(() => Versions, { name: 'version' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.versionsService.findOne(id);
  }


    //_____________________Mutation_____________________//
  // @Mutation(() => Versions)
  // createVersion(@Args('createVersionInput') createVersionInput: CreateVersionInput) {
  //   return this.versionsService.create(createVersionInput);
  // }

  // @Mutation(() => Versions)
  // updateVersion(@Args('updateVersionInput') updateVersionInput: UpdateVersionInput) {
  //   return this.versionsService.update(updateVersionInput.id, updateVersionInput);
  // }

  @Mutation(() => Versions)
  removeVersion(@Args('id', { type: () => Int }) id: number) {
    return this.versionsService.remove(id);
  }
}
