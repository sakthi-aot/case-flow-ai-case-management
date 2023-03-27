import { httpGETRequest } from "../apiManager/httpRequestHandler";
import { GRAPHQL } from "../apiManager/endpoints";
import {
  FETCH_CASE_STATUSES,
  FETCH_CASE_TYPES,
} from "../graphql/constantsRequests";
import { print } from "graphql";

export const fetchCaseStatuses = async () => {
  const url = GRAPHQL;
  const output = await httpGETRequest(
    url,
    { query: print(FETCH_CASE_STATUSES), variables: {} },
    null
  )
    .then((res) => {
      return res.data.data.getCaseStatuses;
    })
    .catch((error) => {
      console.log({ error: "error loading data" });
      return [];
    });
  return output;
};

export const fetchCaseTypess = async () => {
  const url = GRAPHQL;
  const output = await httpGETRequest(
    url,
    { query: print(FETCH_CASE_TYPES), variables: {} },
    null
  )
    .then((res) => {
      return res.data.data.getCaseTypes;
    })
    .catch((error) => {
      console.log({ error: "error loading data" });
      return [];
    });
  return output;
};
