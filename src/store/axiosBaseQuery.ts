import type { AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";

import errorMessageHandler from "@/utils/errorMessageHandler";
import axiosInstance, { CustomAxiosError } from "@/utils/axios";

const axiosBaseQuery = (): BaseQueryFn<{
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}> => {
  return async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: { ...headers, platform: "CHAT FE" },
      });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as CustomAxiosError;

      errorMessageHandler({ ...err, isSuccess: false });
      return {
        error: {
          status: err?.statusCode,
          data: err?.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;
