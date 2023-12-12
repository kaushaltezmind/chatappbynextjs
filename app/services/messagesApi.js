import axios from "axios";
import { config } from "../../app/config/index";
import { AUTH_TOKEN } from "../../app/constants/page";

export const MesssagesApi = {
  getAllConnections: (successCallback, errorCallback, search = "") => {
    return axios
      .get(config.apiUrl + `/connections?search=${search}`, {
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
  getConnectionMessages: (receivername, successCallback, errorCallback) => {
    return axios
      .get(config.apiUrl + `/message/${receivername}`, {
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
  sendMessageToConnection: (message, successCallback, errorCallback) => {
    return axios
      .post(config.apiUrl + "/message", JSON.stringify(message), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        },
      })
      .then((res) => {
        if (res.data.errorCode === 1) {
          successCallback(res.data.errorMessage);
        } else {
          successCallback(res.data);
        }
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  sendAttachmentToConnection: (messageid, formdata, successCallback, errorCallback)=>{
    return axios
    .post(config.apiUrl + `/attachments/${messageid}`,formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res)
      // if (res.data.errorCode === 1) {
      //   successCallback(res.data.errorMessage);
      // } else {
      //   successCallback(res.data.message);
      // }
    })
    .catch((err) => {
      errorCallback(err);
    });
  },
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
  getConnectionInfo: (user, successCallback, errorCallback) => {
    return axios
      .get(config.apiUrl + `/connection/${user}`, {
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
  newMessage: (messageid, successCallback, errorCallback) => {
    return axios
      .put(config.apiUrl + `/newmessage/${messageid}`, null, {
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
