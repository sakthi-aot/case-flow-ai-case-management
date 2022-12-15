import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
//_____________________Custom Imports_____________________//
import { DocumentsModule } from './documents/documents.module';
import { HelpersModule } from './helpers/helpers.module';
import {HttpModule} from  '@nestjs/axios'
@Module({
  imports: [HttpModule,
    DocumentsModule,
    HelpersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'caseflowdev.ccizdidwz3tj.ca-central-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: '0DhoxLWL5HlS27WjLkUL',
      database: 'caseflow_core',
      // synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['./src/migrations/*.ts'],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
