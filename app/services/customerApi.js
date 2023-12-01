import axios from "axios";
import { config } from "../../app/config/index";
import { AUTH_TOKEN } from "../../app/constants/page";

export const CustomerApi = {
  getAllUsers: (
    successCallback,
    errorCallback,
    search = "",
    start = "",
    limit = ""
  ) => {
    return axios
      .get(
        config.apiUrl + `/users?search=${search}&start=${start}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        }
      )
      .then((res) => {
        successCallback(res);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
};
