import axios from "axios";
import { config } from "../../app/config/index";
import { AUTH_TOKEN } from "../../app/constants/page";

export const DashboardApi = {
  checkstatus: (successCallback, errorCallback) => {
    return axios
      .put(config.apiUrl + `/status`, null, {
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
