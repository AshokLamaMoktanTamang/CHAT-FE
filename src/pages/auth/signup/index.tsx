import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import { Button, HookForm, HookFormProvider, HookInput } from "@/components";

import { useAuth } from "@/hooks";
import { PUBLIC_ROUTES } from "@/utils/constants";
import { usePostSignUpMutation } from "../auth.slice";
import { validateEmail, validateName } from "@/utils/regex";

import { ISignUpPayload } from "../types";

const SignUpView = () => {
  const navigate = useNavigate();
  const { signUpHandler } = useAuth();

  const {
    formState: { isDirty },
  } = useFormContext();
  const [signUp, { isLoading }] = usePostSignUpMutation();

  const handleNavigate = useCallback((path: string) => navigate(path), []);

  const handleSignUp = useCallback(
    (data: ISignUpPayload) => signUp(data).unwrap().then(signUpHandler),
    []
  );

  return (
    <HookForm onSubmit={handleSignUp} className="gap-5 flex flex-col">
      <HookInput
        placeholder="Enter First Name"
        label={"First Name"}
        name="firstName"
        required
        validate={validateName}
      />
      <HookInput
        placeholder="Enter Middle Name (Optional)"
        label={"Middle Name"}
        name="middleName"
        validate={validateName}
      />
      <HookInput
        placeholder="Enter Last Name"
        label={"Last Name"}
        name="lastName"
        required
        validate={validateName}
      />
      <HookInput
        placeholder="Enter Email"
        label={"Email"}
        type="email"
        name="email"
        required
        validate={validateEmail}
      />

      <Button type="submit" disabled={!isDirty || isLoading}>
        Sign Up
      </Button>

      <p className="text-center">
        Already have an account?{" "}
        <Button
          onClick={() => handleNavigate(PUBLIC_ROUTES.login)}
          variant={"link"}
          className="p-0"
        >
          Login
        </Button>
      </p>
    </HookForm>
  );
};

const SignUp = () => {
  return (
    <HookFormProvider>
      <SignUpView />
    </HookFormProvider>
  );
};

export default SignUp;
