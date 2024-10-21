import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Navigate, useSearchParams } from "react-router-dom";

import { Button, HookForm, HookFormProvider, HookInput } from "@/components";

import { useAuth } from "@/hooks";
import { PUBLIC_ROUTES } from "@/utils/constants";
import { usePostSetPasswordMutation } from "../auth.slice";

import { ISetPasswordPayload } from "../types";

const SetPasswordView = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("user");

  const {
    formState: { isDirty },
    watch,
  } = useFormContext();
  const { loginHandler } = useAuth();
  const [password, confirmPassword] = watch(["password", "confirmPassword"]);

  const [setPassword, { isLoading }] = usePostSetPasswordMutation();

  const handleSetPassword = useCallback(
    ({ password }: Pick<ISetPasswordPayload, "password">) => {
      if (!token || !userId) return;

      setPassword({ password, token, userId }).unwrap().then(loginHandler);
    },
    []
  );

  if (!token || !userId) return <Navigate replace to={PUBLIC_ROUTES.login} />;

  return (
    <HookForm
      onSubmit={handleSetPassword}
      className="gap-4 flex flex-col justify-between"
    >
      <HookInput name="password" required type="password" label={"Password"} />
      <HookInput
        name="confirmPassword"
        required
        type="password"
        label={"Confirm Password"}
      />
      <Button
        type="submit"
        disabled={isLoading || !isDirty || password !== confirmPassword}
      >
        Set Password
      </Button>
    </HookForm>
  );
};

const SetPassword = () => {
  return (
    <HookFormProvider>
      <SetPasswordView />
    </HookFormProvider>
  );
};

export default SetPassword;
