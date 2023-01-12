import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RequestHandler } from './requestHandler';

const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      return {
        userAuthToken: req.headers.authorization,
      };
    }
  } catch (err) {
  }
};
@Module({
  imports: [GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
    driver: ApolloGatewayDriver,
    server:{
      cors:true,
      context: handleAuth,
    },
    
    gateway: {
      buildService: ({ url }) => new RequestHandler({ url }),
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
        { name: 'Case', url: 'http://localhost:7001/graphql' },
        { name: 'Document', url: 'http://localhost:7002/graphql' }
        ],
      }),
    },
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
