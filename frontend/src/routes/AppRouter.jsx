import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ROUTES } from "@/constants/routes";
import RegisterCivilian from "@/pages/RegisterCivilian";
import { PublicRoute } from "./PublicRoute";
import LoginPage from "@/pages/LoginPage";
import RegisterOrganization from "@/pages/RegisterOrganization";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <MarketingLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
    ],
  },
  {
    path: ROUTES.REGISTER_CIVILIAN,
    element: <RegisterCivilian />,
  },
  {
    path: ROUTES.REGISTER_ORGANIZATION,
    element: <RegisterOrganization />,
  },
  // not found route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
