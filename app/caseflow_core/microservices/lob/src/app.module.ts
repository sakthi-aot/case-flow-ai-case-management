import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseflowLobModule } from './caseflow_lob/caseflow_lob.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

const keyCloakOptionsProvider =  {
  provide: 'keyCloakDataProvider',
  useFactory: (config: ConfigService) => {
    return {

      // authServerUrl: "https://caseflow-idm.aot-technologies.com:8443/auth",
      // realm: "caseflow",
      // clientId: "case-flow-nest",
      // secret: "Qhvu0sBg15UsiplYL5msFVqjzyOVaxRr"

      authServerUrl: config.get('KEYCLOCK_AUTH_URL'),
      realm: config.get('KEYCLOCK_REALM'),
      clientId: config.get('KEYCLOCK_CLIENT_ID'),
      secret: config.get('KEYCLOCK_SECRET'),
    }
  },
  inject: [ ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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


      host: config.get('POSTGRESQL_HOST') || 'caseflowdev.ccizdidwz3tj.ca-central-1.rds.amazonaws.com',
      port: parseInt(config.get('POSTGRESQL_PORT')) || 5432,
      database: config.get('POSTGRES_DATABASE') || 'caseflow_core',
      username: config.get('POSTGRES_DB_USERNAME') || 'postgres',
      password: config.get('POSTGRES_DB_PASSWORD') || '0DhoxLWL5HlS27WjLkUL',
      // host: 'caseflowdev.ccizdidwz3tj.ca-central-1.rds.amazonaws.com',
      // port: 5432,
      // username: 'postgres',
      // password: '0DhoxLWL5HlS27WjLkUL',
      // database: 'caseflow_lob',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['./src/migrations/*.ts'],
    }), }),
    CaseflowLobModule,
  ],
  controllers: [AppController],
  providers: [AppService, 
  //    {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  //  },
  ],
})
export class AppModule {}
