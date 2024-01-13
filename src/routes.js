import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgetForm from "./pages/auth/ForgetPage";
import GlobalSetting from "./pages/Global Setting";
import UserManagement from "./pages/User Management";
import ChangePassword from "./pages/auth/ChangePassword";
import ResetPassword from "./pages/auth/ResetPasswordPage";
import AddUser from "./pages/User Management/AddUser";
import EditUser from "./pages/User Management/EditUser";
import Privacy from "./pages/CMS Managment/privacy/Privacy";
import Terms from "./pages/CMS Managment/terms/Terms";
import FaqList from "./pages/CMS Managment/faq/List";
import FaqEdit from "./pages/CMS Managment/faq/Edit";
import ViewPrivacy from "./pages/CMS Managment/privacy/ViewPrivacy";
import ViewTerms from "./pages/CMS Managment/terms/ViewTerms";

export default function Router() {
  const isLoggedIn = useSelector((state) => state.auth.token);

  const PrivateRoutes = [
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <Page404 />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        ,
      ],
    },
    {
      path: "cms",
      element: <DashboardLayout />,
      errorElement: <Page404 />,
      children: [
        { path: "faq", element: <FaqList /> },
        { path: "faq/add", element: <FaqEdit /> },
        { path: "faq/edit/:id", element: <FaqEdit /> },

        { path: "privacy-policy", element: <ViewPrivacy /> },
        { path: "privacy-policy/edit", element: <Privacy /> },

        { path: "terms-conditions", element: <ViewTerms /> },
        { path: "terms-conditions/edit", element: <Terms /> },
      ],
    },
    {
      path: "user-management",
      element: <DashboardLayout />,
      errorElement: <Page404 />,
      children: [
        { path: "", element: <UserManagement /> },
        { path: "add-user", element: <AddUser /> },
        { path: "edit-user", element: <EditUser /> },
      ],
    },
    {
      path: "global-setting",
      element: <DashboardLayout />,
      children: [{ path: "", element: <GlobalSetting /> }],
    },
    {
      path: "change-password",
      element: <DashboardLayout />,
      children: [{ path: "", element: <ChangePassword /> }],
    },
    { path: "*", element: <Navigate to="/dashboard" /> },
  ];

  const PublicRoutes = [
    {
      element: <SimpleLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "login", element: <LoginPage /> },
        { path: "/forgot", element: <ForgetForm /> },

        { path: "/reset-password/:otp", element: <ResetPassword /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ];

  const routes = useRoutes(isLoggedIn ? PrivateRoutes : PublicRoutes);

  return routes;
}
