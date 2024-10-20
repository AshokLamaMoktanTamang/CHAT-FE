import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { setItem } from "@/utils/storage";
import { PRIVATE_ROUTES } from "@/utils/constants";

import { ILoginResponse } from "@/pages/auth/types";

const useAuth = () => {
  const navigate = useNavigate();

  const loginHandler = useCallback(({ accessToken }: ILoginResponse) => {
    setItem("token", accessToken);

    navigate(PRIVATE_ROUTES.home);
  }, []);

  return { loginHandler };
};

export default useAuth;
