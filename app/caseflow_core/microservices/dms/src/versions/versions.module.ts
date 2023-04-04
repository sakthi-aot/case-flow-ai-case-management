import { Module } from '@nestjs/common';
import { VersionsService } from './services/versions.service';
import { VersionsResolver } from './resolvers/versions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Versions } from './entities/version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Versions])],
  providers: [VersionsResolver, VersionsService],
  exports: [VersionsService],
})
export class VersionsModule {}
