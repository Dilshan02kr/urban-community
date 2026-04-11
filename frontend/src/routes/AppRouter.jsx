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
import { CivilianDashboardLayout } from "@/layouts/CivilianDashboardLayout";
import CivilianDashboardHomePage from "@/pages/civilian/CivilianDashboardHomePage";
import CivilianDashboardSubPage from "@/pages/civilian/CivilianDashboardSubPage";
import GarbagePickupRequestPage from "@/pages/civilian/GarbagePickupRequestPage";

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
  {
    path: ROUTES.DASHBOARD,
    element: <CivilianDashboardLayout />,
    children: [
      {
        index: true,
        element: <CivilianDashboardHomePage />,
      },
      {
        path: "events",
        element: (
          <CivilianDashboardSubPage
            title="Events"
            description="Eco programs, clean-up drives, and community happenings."
          />
        ),
      },
      {
        path: "issue-reporting",
        element: (
          <CivilianDashboardSubPage
            title="Issue Reporting"
            description="Report civic issues and track responses from your area."
          />
        ),
      },
      {
        path: "garbage-collectors",
        element: (
          <CivilianDashboardSubPage
            title="Garbage collectors"
            description="Schedules, contacts, and waste collection information."
          />
        ),
      },
      {
        path: "about",
        element: (
          <CivilianDashboardSubPage
            title="About"
            description="Urban Community — connect, report, and improve your city."
          />
        ),
      },
      {
        path: "garbage-pickup",
        element: <GarbagePickupRequestPage />,
      },
    ],
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
