import {get} from "../graphqlRequestHandler"
import { gql } from 'graphql-request'

export const getRecentCases = () =>{
    const query = gql`
    {
  cases{
    edges{
      node{
        id
      }
    }
  }
}
  `
  return get("http://localhost:5000/graphql",query)
}