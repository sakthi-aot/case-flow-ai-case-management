import axios from "axios";

import UserService from "../../services/UserService";
import {store} from "../../services/Store";
import {setLoader} from "../../reducers/applicationReducer";
export const httpGETRequest = (
  url,
  data,
  token,
  isBearer = true,
  headers = null
) => {
  return axios.get(url, {
    params: data,
    headers: !headers
      ? {
          Authorization: isBearer
            ? `Bearer ${token || UserService.getToken()}`
            : token,
        }
      : headers
  });
};

export const httpPOSTRequest = (url, data, token, isBearer = true) => {
  return axios.post(url, data, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    },
  });
};

export const httpPOSTRequestWithoutToken = (
  url,
  data,
  token,
  // eslint-disable-next-line no-unused-vars
  isBearer = true
) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const httpPOSTRequestWithHAL = (url, data, token, isBearer = true) => {
  return axios.post(url, data, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
      Accept: "application/hal+json",
    },
  });
};

export const httpPUTRequest = (url, data, token, isBearer = true) => {
  return axios.put(url, data, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    },
  });
};

export const httpDELETERequest = (url, token, isBearer = true) => {
  return axios.delete(url, {
    headers: {
      Authorization: isBearer
        ? `Bearer ${token || UserService.getToken()}`
        : token,
    },
  });
};

export const httpGETBolbRequest = (
  url,
  data,
  token,
  isBearer = true,
  headers = null
) => {
  return axios.get(url, {
    params: data,
    headers: !headers
      ? {
          Authorization: isBearer
            ? `Bearer ${token || UserService.getToken()}`
            : token,
        }
      : headers,
    responseType: "blob",
  });
};

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.dispatch(setLoader(true));
  return config;
}, function (error) {
  // Do something with request error
  store.dispatch(setLoader(false));
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.dispatch(setLoader(false));
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  store.dispatch(setLoader(false));
  return Promise.reject(error);
});