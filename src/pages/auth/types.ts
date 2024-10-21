export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface ISignUpPayload {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: number;
  password: string;
}
