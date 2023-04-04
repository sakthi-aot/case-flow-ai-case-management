import { GraphQLClient } from "graphql-request";
import { RequestInit } from "node-fetch";
import UserService from "../../services/UserService";

export const get = (endpoint, query, variables) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    method: "GET",
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
    requestMiddleware: middleware,
  });

  return graphQLClient.request(query, variables);
};

export const mutation = (endpoint, query, variables) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    requestMiddleware: middleware,
  });
  graphQLClient.request(query, variables);
};

function middleware(request: RequestInit) {
  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${UserService.getToken()}`,
    },
  };
}
