import baseApi from "@/store/baseApi";
import { ILoginPayload, ILoginResponse } from "./types";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (data) => ({
        url: `auth/sign-in`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = authApiSlice;
