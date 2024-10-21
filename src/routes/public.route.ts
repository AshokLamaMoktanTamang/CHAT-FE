import { PUBLIC_ROUTES } from "@/utils/constants";
import { ChildrenRouteElement, RouteType } from "./type";

const type = RouteType.PUBLIC;

export const authLayoutRoutes: ChildrenRouteElement[] = [
  {
    path: PUBLIC_ROUTES.login,
    type,
    component: async () => {
      const { LoginPage } = await import("@/pages/auth/index");
      return LoginPage;
    },
  },
  {
    path: PUBLIC_ROUTES.signUp,
    type,
    component: async () => {
      const { SignUpPage } = await import("@/pages/auth/index");
      return SignUpPage;
    },
  },
  {
    path: PUBLIC_ROUTES.forgotPassword,
    type,
    component: async () => {
      const { ForgotPasswordPage } = await import("@/pages/auth/index");
      return ForgotPasswordPage;
    },
  },
  {
    path: PUBLIC_ROUTES.otpVerification,
    type,
    component: async () => {
      const { OtpVerificationPage } = await import("@/pages/auth/index");
      return OtpVerificationPage;
    },
  },
  {
    path: PUBLIC_ROUTES.setPassword,
    type,
    component: async () => {
      const { SetPasswordPage } = await import("@/pages/auth/index");
      return SetPasswordPage;
    },
  },
];
