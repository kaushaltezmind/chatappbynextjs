import axios from "axios";
import { config } from "../config/index";
import { AUTH_TOKEN, USER_NAME } from "../constants/page";

export const UserApi = {
  login: (loginCredential, successCallback, errorCallback) => {
    return axios
      .post(config.apiUrl + "/login", loginCredential)
      .then((res) => {
        if (res.data.errorCode === 1) {
          successCallback(res.data.errorMessage);
        } else {
          localStorage.setItem(AUTH_TOKEN, res.data.token);
          localStorage.setItem(USER_NAME, res.data.extra);
          successCallback(res.data.message);
        }
      })
      .catch((err) => {
        errorCallback(err);
      });
  },

  signup: (signupCredential, successCallback, errorCallback) => {
    return axios
      .post(config.apiUrl + "/signup", signupCredential)
      .then((res) => {
        if (res.data.errorCode === 1) {
          successCallback(res.data.errorMessage);
        } else {
          localStorage.setItem(AUTH_TOKEN, res.data.token);
          localStorage.setItem(USER_NAME, res.data.extra);
          successCallback(res.data.message);
        }
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
};
