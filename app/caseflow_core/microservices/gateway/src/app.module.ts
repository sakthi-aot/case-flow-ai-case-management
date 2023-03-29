import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RequestHandler } from './requestHandler';
import { config } from 'dotenv';
config();

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
        { name: 'Case', url: process.env.CASE_SUBGRAPH_URL },
        { name: 'Document', url: process.env.DOCUMENT_SUBGRAPH_URL }
        ],
      }),
    },
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
