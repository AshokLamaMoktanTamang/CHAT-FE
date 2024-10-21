import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/store/axiosBaseQuery";

import { IUser } from "./type";

const baseApi = createApi({
  reducerPath: "baseApiReducer",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    whoAmI: builder.query<IUser, void>({
      query: () => ({ url: "user", method: "GET" }),
    }),
  }),
});

export const { useWhoAmIQuery } = baseApi;

export default baseApi;
