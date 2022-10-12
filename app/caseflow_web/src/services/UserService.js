import Keycloak from "keycloak-js";
let KeycloakData, doLogin, doLogout;

const setKeycloakJson = (tenantKey = null, ...rest) => {
  let kcJson;
  const done = rest.length ? rest[0] : () => {};
  kcJson = {
    url: "http://localhost:8085/auth",
    realm: "caseflow",
    clientId: "case-flow-web",
  };
  KeycloakData = new Keycloak(kcJson);
  doLogin = KeycloakData?.login;
  doLogout = KeycloakData?.logout;
  done(kcJson.clientId);
};

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */

const initKeycloak = (store, ...rest) => {
  const clientId = rest.length && rest[0];
  const done = rest.length ? rest[1] : () => {};
  KeycloakData.init({
    onLoad: "check-sso",
    promiseType: "native",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
    checkLoginIframe: false,
  })
    .then((authenticated) => {
      if (authenticated) {
        console.log(KeycloakData);
      } else {
        doLogin();
      }
    })
    .catch((error) => {
      console.error("Keyclok init failed.", error);

      alert("Login Error.", error);
    });
};

const getTokenExpireTime = (keycloak) => {
  const { exp, iat } = keycloak.tokenParsed;
  if (exp && iat) {
    const toeknExpiretime =
      new Date(exp).getMilliseconds() - new Date(iat).getMilliseconds();
    return toeknExpiretime * 1000;
  } else {
    return 60000;
  }
};

let refreshInterval;
const refreshToken = (store) => {
  const refreshTime = getTokenExpireTime(KeycloakData);
  refreshInterval = setInterval(() => {
    KeycloakData &&
      KeycloakData.updateToken(5)
        .then((refreshed) => {
          if (refreshed) {
            clearInterval(refreshInterval);
            // store.dispatch(setUserToken(KeycloakData.token));
            refreshToken(store);
          }
        })
        .catch((error) => {
          console.log(error);
          userLogout();
        });
  }, refreshTime);
};

/**
 * Logout function
 */
const userLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  clearInterval(refreshInterval);
  doLogout();
};


const getToken = () => KeycloakData?.token;

const UserService = {
  initKeycloak,
  userLogout,
  getToken,
  setKeycloakJson,
};

export default UserService;
