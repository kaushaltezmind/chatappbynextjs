import axios from "axios";
import { config } from "../../app/config/index";
import { AUTH_TOKEN } from "../../app/constants/page";

export const SettingApi = {
  getUser: (successCallback, errorCallback) => {
    return axios
      .get(config.apiUrl + `/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        },
      })
      .then((res) => {
        successCallback(res);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  updateUserDetails: (data, successCallback, errorCallback) => {
    return axios
      .put(config.apiUrl + "/user", JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        },
      })
      .then((res) => {
        successCallback(res);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  changePassword: (data, successCallback, errorCallback) => {
    return axios
      .post(config.apiUrl + "/password", JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        },
      })
      .then((res) => {
        successCallback(res);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
};
