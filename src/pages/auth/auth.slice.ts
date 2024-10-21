import baseApi from "@/store/baseApi";
import {
  IForgotPasswordPayload,
  ILoginPayload,
  ILoginResponse,
  IResetPasswordPayload,
  ISignUpPayload,
} from "./types";

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (data) => ({
        url: `auth/sign-in`,
        method: "POST",
        data,
      }),
    }),
    postSignUp: builder.mutation<void, ISignUpPayload>({
      query: (data) => ({
        url: `auth/signup`,
        method: "POST",
        data,
      }),
    }),
    postForgotPassword: builder.mutation<void, IForgotPasswordPayload>({
      query: (data) => ({
        url: `auth/forgot-password`,
        method: "POST",
        data,
      }),
    }),
    postResetPassword: builder.mutation<ILoginResponse, IResetPasswordPayload>({
      query: (data) => ({
        url: `auth/reset-password`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  usePostLoginMutation,
  usePostSignUpMutation,
  usePostForgotPasswordMutation,
  usePostResetPasswordMutation,
} = authApiSlice;
