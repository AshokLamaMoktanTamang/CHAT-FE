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
];
