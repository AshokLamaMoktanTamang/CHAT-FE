import { HookForm, HookFormProvider, HookInput } from "@/components";

const LoginView = () => {
  return (
    <HookForm>
      <HookInput label={"Email"} type="email" name="email" />
      <HookInput label={"Password"} type="password" name="password" />
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
