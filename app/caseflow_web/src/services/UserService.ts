import { setAuthToken } from "../reducers/authReducer";

import { _kc } from "../constants/tenantConstant";

const initKeycloak = (store: any, ...rest: any[]) => {
  const done = rest.length ? rest[0] : () => {};
  const token = sessionStorage.getItem("authToken");
  const reToken = sessionStorage.getItem("refreshToken");
  KeycloakData.init({
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
    checkLoginIframe: false,
    token: token ? token : "",
    refreshToken: reToken ? reToken : "",
  }).then((authenticated) => {
    console.log("authenticated", authenticated);
    if (authenticated) {
      console.log(KeycloakData);
      if (
        KeycloakData &&
        KeycloakData.resourceAccess &&
        KeycloakData.resourceAccess.account
      ) {
        const UserRoles = KeycloakData.resourceAccess.account.roles;

        const userInfo = KeycloakData.loadUserInfo();

        const email = KeycloakData?.tokenParsed?.email || "external";

        console.log("UserRoles", UserRoles);
        console.log("KeycloakData", KeycloakData.token);
        sessionStorage.setItem(
          "authToken",
          KeycloakData["token"] ? KeycloakData["token"] : ""
        );
        sessionStorage.setItem(
          "refreshToken",
          KeycloakData["refreshToken"] ? KeycloakData["refreshToken"] : ""
        );
        console.log("userInfo", userInfo);
        console.log("email", email);
        done({
          roles: UserRoles,
          token: KeycloakData.token,
          userInfo: userInfo,
          email: email,
        });
        refreshToken(store);
      } else {
        doLogout();
      }
    } else {
      console.warn("not authenticated!");
      doLogin();
    }
  });
};

let refreshInterval: any;
const refreshToken = (store: any) => {
  refreshInterval = setInterval(() => {
    KeycloakData &&
      KeycloakData.updateToken(5)
        .then((refreshed) => {
          if (refreshed) {
            store.dispatch(setAuthToken(KeycloakData.token));
            sessionStorage.setItem(
              "authToken",
              KeycloakData["token"] ? KeycloakData["token"] : ""
            );
            sessionStorage.setItem(
              "refreshToken",
              KeycloakData["refreshToken"] ? KeycloakData["refreshToken"] : ""
            );
          }
        })
        .catch((error) => {
          console.log(error);
          userLogout();
        });
  }, 6000);
};

const userLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  clearInterval(refreshInterval);
  doLogout();
};

const getFormioToken = () => localStorage.getItem("formioToken");

const KeycloakData = _kc;

const doLogin = KeycloakData.login;
const doLogout = KeycloakData.logout;
const getToken = () => KeycloakData.token;

const UserService = {
  initKeycloak,
  userLogout,
  getToken,
  getFormioToken,
};

export default UserService;
