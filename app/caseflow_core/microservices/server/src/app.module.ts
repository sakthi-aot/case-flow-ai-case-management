import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';

//_____________________Custom Imports_____________________//
import { DmsModule } from './dms/dms.module';
import { CasesModule } from './cases/cases.module';
import { CaseHistoryModule } from './case_history/case_history.module';
import { CaseEventsModule } from './case_events/case_events.module';
import { EventTypesModule } from './event_types/event_types.module';
import { CaseStatusModule } from './case_status/case_status.module';
import { CaseTypesModule } from './case_types/case_types.module';
import { APP_GUARD } from '@nestjs/core';

/**
 *  Summary :Keyclock settings
 *  Created By : Akhila U S
 */
const keyCloakOptionsProvider = {
  provide: 'keyCloakDataProvider',
  useFactory: (config: ConfigService) => {
    return {
      authServerUrl: config.get('KEYCLOCK_AUTH_URL'),
      realm: config.get('KEYCLOCK_REALM'),
      clientId: config.get('KEYCLOCK_CLIENT_ID'),
      secret: config.get('KEYCLOCK_SECRET'),
    };
  },
  inject: [ConfigService],
};
/**
 * Summary : App Module Wrapping All Functionality For Case Micro Service
 * Created By : Akhila U S
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DmsModule,
    CasesModule,
    KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host:
          config.get('POSTGRESQL_HOST') ||
          'caseflowdev.ccizdidwz3tj.ca-central-1.rds.amazonaws.com',
        port: parseInt(config.get('POSTGRESQL_PORT')) || 5432,
        database: config.get('POSTGRES_DATABASE') || 'caseflow_core',
        username: config.get('POSTGRES_DB_USERNAME') || 'postgres',
        password: config.get('POSTGRES_DB_PASSWORD') || '0DhoxLWL5HlS27WjLkUL',

        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['./src/migrations/*.ts'],
      }),
    }),
    CaseHistoryModule,
    CaseEventsModule,
    EventTypesModule,
    CaseStatusModule,
    CaseTypesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD, //For keyclock Auth Token
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
