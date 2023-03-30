import {
  KEYCLOAK_CLIENT,
  KEYCLOAK_REALM,
  KEYCLOAK_AUTH_URL,
} from "./constants";
import Keycloak from "keycloak-js";

export const tenantDetail = {
  realm: KEYCLOAK_REALM,
  url: KEYCLOAK_AUTH_URL,
  clientId: KEYCLOAK_CLIENT,
};

export const _kc = new Keycloak(tenantDetail);
