import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import { Button, HookForm, HookFormProvider, HookInput } from "@/components";

import { useAuth } from "@/hooks";
import { validateEmail } from "@/utils/regex";
import { PUBLIC_ROUTES } from "@/utils/constants";
import { usePostLoginMutation } from "../auth.slice";

import { ILoginPayload } from "../types";

const LoginView = () => {
  const navigate = useNavigate();
  const { loginHandler } = useAuth();
  const [login, { isLoading }] = usePostLoginMutation();

  const {
    formState: { isDirty },
  } = useFormContext<Partial<ILoginPayload>>();

  const handleLogin = useCallback((data: ILoginPayload) => {
    login(data).unwrap().then(loginHandler);
  }, []);

  const handleNavigate = useCallback((path: string) => navigate(path), []);

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

      <div className="flex flex-col justify-between">
        <p className="text-center">
          Don't have account?{" "}
          <Button
            onClick={() => handleNavigate(PUBLIC_ROUTES.signUp)}
            variant={"link"}
            className="p-0"
          >
            Sign up
          </Button>
        </p>

        <Button
          onClick={() => handleNavigate(PUBLIC_ROUTES.forgotPassword)}
          variant={"link"}
        >
          Forgot Password?
        </Button>
      </div>
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
