import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VersionsService } from '../services/versions.service';
import { Versions } from '../entities/version.entity';

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
}
