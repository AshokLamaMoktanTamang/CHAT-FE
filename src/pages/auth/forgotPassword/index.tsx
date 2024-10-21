import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import { Button, HookForm, HookFormProvider, HookInput } from "@/components";

import { setItem } from "@/utils/storage";
import { validateEmail } from "@/utils/regex";
import { PUBLIC_ROUTES } from "@/utils/constants";
import { usePostForgotPasswordMutation } from "../auth.slice";

import { IForgotPasswordPayload } from "../types";

const ForgotPasswordView = () => {
  const navigate = useNavigate();

  const {
    formState: { isDirty },
  } = useFormContext();
  const [forgotPassword, { isLoading }] = usePostForgotPasswordMutation();

  const handleForgotPassword = useCallback(
    (data: IForgotPasswordPayload) =>
      forgotPassword(data)
        .unwrap()
        .then(() => {
          navigate(PUBLIC_ROUTES.otpVerification);
          setItem("email", data.email);
        }),
    []
  );

  return (
    <HookForm onSubmit={handleForgotPassword} className="gap-5 flex flex-col">
      <HookInput
        placeholder="Enter Email"
        label={"Email"}
        type="email"
        name="email"
        required
        validate={validateEmail}
      />

      <Button type="submit" disabled={!isDirty || isLoading}>
        Forgot Password
      </Button>

      <Button variant={"ghost"} onClick={() => navigate(PUBLIC_ROUTES.login)}>
        Back to Login
      </Button>
    </HookForm>
  );
};

const ForgotPassword = () => {
  return (
    <HookFormProvider>
      <ForgotPasswordView />
    </HookFormProvider>
  );
};

export default ForgotPassword;
