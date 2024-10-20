import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { config } from "@/config";
import { getItem, setItem, removeItem } from "./storage";
import "react-toastify/dist/ReactToastify.css";

interface AxiosBaseResponse {
  isSuccess: boolean;
  statusCode: number;
}

export interface CustomAxiosError extends AxiosBaseResponse {
  message: string;
  error: string;
}

export type PostRefreshTokenResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  statusCode: number;
};

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

export const logout = () => {
  removeItem("token");
  removeItem("refresh-token");
  window.location.replace("/login");
};

const axiosInstance = axios.create({
  baseURL: config.baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    if (!error.response) {
      const error = {
        response: {
          data: { message: "Seems like its trouble in connecting!" },
        },
      };
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true;
        const refreshToken = getItem("refresh-token");

        if (!refreshToken) return Promise.reject(error.response.data);

        isRefreshing = true;

        return axios
          .post(`${originalRequest.baseURL}auth/refresh-token`, {
            refreshToken,
          })
          .then((res: AxiosResponse<PostRefreshTokenResponse, any>) => {
            if (res.status === 200) {
              setItem("token", res.data.data.accessToken);
              setItem("refresh-token", res.data.data.refreshToken);

              originalRequest.headers.Authorization =
                "Bearer " + res.data.data.accessToken;
              refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                axiosInstance
                  .request(config)
                  .then((response) => resolve(response))
                  .catch((err) => reject(err));
              });
              refreshAndRetryQueue.length = 0;
              return axiosInstance(originalRequest);
            }
          })
          .catch(() => {
            logout();
            return;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 403
    ) {
      logout();
      return;
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
