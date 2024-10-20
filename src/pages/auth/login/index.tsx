import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { Button, HookForm, HookFormProvider, HookInput } from "@/components";

import { useAuth } from "@/hooks";
import { validateEmail } from "@/utils/regex";
import { usePostLoginMutation } from "../auth.slice";

import { ILoginPayload } from "../types";

const LoginView = () => {
  const { loginHandler } = useAuth();
  const [login, { isLoading }] = usePostLoginMutation();

  const {
    formState: { isDirty },
  } = useFormContext<Partial<ILoginPayload>>();

  const handleLogin = useCallback((data: ILoginPayload) => {
    login(data).unwrap().then(loginHandler);
  }, []);

  return (
    <HookForm onSubmit={handleLogin} className="gap-5 flex flex-col">
      <HookInput
        placeholder="Enter Email"
        label={"Email"}
        type="email"
        name="email"
        required
        validate={validateEmail}
      />
      <HookInput
        placeholder="Enter Password"
        label={"Password"}
        type="password"
        name="password"
      />

      <Button type="submit" disabled={!isDirty || isLoading}>
        Login
      </Button>
    </HookForm>
  );
};

const Login = () => {
  return (
    <HookFormProvider>
      <LoginView />
    </HookFormProvider>
  );
};

export default Login;
