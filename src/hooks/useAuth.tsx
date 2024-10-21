import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { clearStorage, setItem } from "@/utils/storage";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/utils/constants";

import { ILoginResponse } from "@/pages/auth/types";
import { toastSuccess } from "@/utils/toast";

const useAuth = () => {
  const navigate = useNavigate();

  const loginHandler = useCallback(({ accessToken }: ILoginResponse) => {
    clearStorage();
    setItem("token", accessToken);

    navigate(PRIVATE_ROUTES.home);
  }, []);

  const signUpHandler = useCallback(() => {
    navigate(PUBLIC_ROUTES.login);

    toastSuccess(
      "Successful Registered!",
      "Email will be sent to verify the email"
    );
  }, []);

  return { loginHandler, signUpHandler };
};

export default useAuth;
