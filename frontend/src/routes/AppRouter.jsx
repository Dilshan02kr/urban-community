import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import CivilianProfile from "@/pages/civilian/CivilianProfile";
import GarbagePickupRequestPage from "@/pages/civilian/GarbagePickupRequestPage";
import RecyclingCentersPage from "@/pages/civilian/RecyclingCentersPage";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardHomePage from "@/pages/admin/AdminDashboardHomePage";
import AdminRecyclingCentersPage from "@/pages/admin/AdminRecyclingCentersPage";
import AdminPickupRequestsPage from "@/pages/admin/AdminPickupRequestsPage";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER_CIVILIAN,
        element: <RegisterCivilian />,
      },
      {
        path: ROUTES.REGISTER_ORGANIZATION,
        element: <RegisterOrganization />,
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
        element: <GarbagePickupRequestPage />,
      },
      {
        path: "recycling-centers",
        element: <RecyclingCentersPage />,
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
        path: ROUTES.CIVILIAN_PROFILE,
        element: <CivilianProfile />,

    ],
  },
  // Admin login (standalone page)
  {
    path: ROUTES.ADMIN_LOGIN,
    element: <AdminLoginPage />,
  },
  // Admin dashboard
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardHomePage />,
      },
      {
        path: "recycling-centers",
        element: <AdminRecyclingCentersPage />,
      },
      {
        path: "pickup-requests",
        element: <AdminPickupRequestsPage />,
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
