import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      Auth
      <Outlet />
    </>
  );
};

export default AuthLayout;
