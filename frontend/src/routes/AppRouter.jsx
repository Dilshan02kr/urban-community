import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { MarketingLayout } from "@/layouts/MarketingLayout";
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
import IssueReportingPage from "@/pages/civilian/IssueReportingPage";
import CivilianIssueDetailPage from "@/pages/civilian/CivilianIssueDetailPage";
import RecyclingCentersPage from "@/pages/civilian/RecyclingCentersPage";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardHomePage from "@/pages/admin/AdminDashboardHomePage";
import AdminRecyclingCentersPage from "@/pages/admin/AdminRecyclingCentersPage";
import AdminPickupRequestsPage from "@/pages/admin/AdminPickupRequestsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import OrganizationLayout from "@/layouts/OrganizationLayout";
import OrganizationEvents from "@/pages/organization/OrganizationEvents";
import OrganizationDashboard from "@/pages/organization/OrganizationDashboard";
import OrgProfile from "@/pages/organization/OrgProfile";

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
  // Organization dashboard
  {
    element: <ProtectedRoute role="organization" />,
    children: [
      {
        path: ROUTES.ORGANIZATION_LAYOUT,
        element: <OrganizationLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.ORGANIZATION_DASHBOARD} replace />,
          },
          {
            path: "dashboard",
            element: <OrganizationDashboard />,
          },
          {
            path: "events",
            element: <OrganizationEvents />,
          },
          {
            path: "explore-events",
            element: <OrganizationEvents />,
          },
          {
            path: "profile",
            element: <OrgProfile />,
          },
        ],
      },
    ],
  },
  // Civilian dashboard
  {
    element: <ProtectedRoute role="citizen" />,
    children: [
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
            path: "issue-reporting/:issueId",
            element: <CivilianIssueDetailPage />,
          },
          {
            path: "issue-reporting",
            element: <IssueReportingPage />,
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
          },
        ],
      },
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
