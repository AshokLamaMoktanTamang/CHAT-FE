import { Outlet, useLocation } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components";

import { PUBLIC_ROUTES } from "@/utils/constants";

const header = {
  [PUBLIC_ROUTES.login]: "Sign In",
  [PUBLIC_ROUTES.signUp]: "Register for Free!",
};

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>{header[pathname]}</CardTitle>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
