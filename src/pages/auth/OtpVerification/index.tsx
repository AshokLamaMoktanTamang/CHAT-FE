import { useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Button,
  HookForm,
  HookFormProvider,
  HookInput,
  HookOtpInput,
} from "@/components";

import { useAuth } from "@/hooks";
import { getItem } from "@/utils/storage";
import { toastSuccess } from "@/utils/toast";
import { useFormContext } from "react-hook-form";
import { PUBLIC_ROUTES } from "@/utils/constants";
import {
  usePostForgotPasswordMutation,
  usePostResetPasswordMutation,
} from "../auth.slice";

import { IResetPasswordPayload } from "../types";

const OtpVerificationView = () => {
  const navigate = useNavigate();
  const email = getItem<string>("email");

  const {
    formState: { isDirty },
  } = useFormContext();
  const { loginHandler } = useAuth();

  const [resetPassword, { isLoading: isResetLoading }] =
    usePostResetPasswordMutation();
  const [resendOtp, { isLoading: resendOtpLoading }] =
    usePostForgotPasswordMutation();

  const handleChangePassword = useCallback(
    ({ otp, ...rest }: IResetPasswordPayload) =>
      resetPassword({ ...rest, otp: parseInt(otp.toString()) })
        .unwrap()
        .then(loginHandler),
    []
  );

  const handleResend = useCallback(() => {
    if (!email) return;

    resendOtp({ email })
      .unwrap()
      .then(() => toastSuccess("Resend Otp", "Otp send to mail"));
  }, [email]);

  if (!email) return <Navigate replace to={PUBLIC_ROUTES.login} />;

  return (
    <HookForm className="flex flex-col gap-3" onSubmit={handleChangePassword}>
      <HookInput readOnly name="email" disabled label={"email"} />
      <HookOtpInput label="OTP" name="otp" maxLength={6} required />
      <HookInput type="password" label={"Password"} name="password" required />

      <div className="flex flex-col mt-5">
        <Button disabled={!isDirty || isResetLoading} type="submit">
          Change Password
        </Button>

        <Button variant={"ghost"} onClick={() => navigate(PUBLIC_ROUTES.login)}>
          Back To Login
        </Button>

        <Button
          disabled={resendOtpLoading}
          onClick={handleResend}
          variant={"link"}
        >
          Resend Otp
        </Button>
      </div>
    </HookForm>
  );
};

const OtpVerification = () => {
  return (
    <HookFormProvider defaultValues={{ email: getItem("email") }}>
      <OtpVerificationView />
    </HookFormProvider>
  );
};

export default OtpVerification;
