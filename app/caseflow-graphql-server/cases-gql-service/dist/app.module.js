"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const cases_module_1 = require("./cases/cases.module");
const apollo_1 = require("@nestjs/apollo");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const keyCloakOptionsProvider = {
    provide: 'keyCloakDataProvider',
    useFactory: (config) => {
        return {
            authServerUrl: config.get('KEYCLOCK_AUTH_URL'),
            realm: config.get('KEYCLOCK_REALM'),
            clientId: config.get('KEYCLOCK_CLIENT_ID'),
            secret: config.get('KEYCLOAK_CLIENT_SECRET')
        };
    },
    inject: [config_1.ConfigService],
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloFederationDriver,
                autoSchemaFile: 'schema.gql',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: '127.0.0.1',
                port: 5433,
                username: 'postgres',
                password: 'changeme',
                database: 'caseflow',
                synchronize: true,
                entities: ['dist/**/*.entity{.ts,.js}'],
                migrations: ['./src/migrations/*.ts'],
            }),
            cases_module_1.CasesModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map