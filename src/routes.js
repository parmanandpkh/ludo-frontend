import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import LoginPage from './pages/auth/LoginPage';
import ForgetForm from './pages/auth/ForgetPage';
import CMSManagment from './pages/CMS Managment';
import GlobalSetting from './pages/Global Setting';
import UserManagement from './pages/User Management';
import ChangePassword from './pages/auth/ChangePassword';

import ResetPassword from './pages/auth/ResetPasswordPage';
import AboutUs from './pages/CMS Managment/ViewCms';
import PrivacyPolicy from './pages/CMS Managment/PrivacyPolicy';
import EditAboutUs from './pages/CMS Managment/EditCMS';
import EditPrivacyPolicy from './pages/CMS Managment/EditPrivacyPolicy';
import AddUser from './pages/User Management/AddUser';
import EditUser from './pages/User Management/EditUser';
import AddCMS from './pages/CMS Managment/AddCMS';
import EditCms from './pages/CMS Managment/EditCMS';
import ViewCms from './pages/CMS Managment/ViewCms';




export default function Router() {
  const isLoggedIn = useSelector((state) => state.auth.token);

  const PrivateRoutes = [
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      errorElement: <Page404 />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
       ,
      ],
    },
    {path:'cms-management',
     element:<DashboardLayout />,
     errorElement: <Page404 />,
    children : [
      {path:'', element:<CMSManagment/>},
      // {path:'add-cms',element:<AddCMS/>},
      {path:'view-cms', element:<ViewCms/>},
      {path:'edit-cms', element:<EditCms/>},
      // {path:'privacy-policy', element:<PrivacyPolicy/>},
      // {path:'edit-privacy-policy', element:<EditPrivacyPolicy/>}
    ]},
    {path:'user-management',
    element:<DashboardLayout />,
    errorElement: <Page404 />,
    children:[
      {path:'',element:<UserManagement/>},
      {path:'add-user',element:<AddUser/>},
      {path:'edit-user',element:<EditUser/>}
    ]
  },
  {path:'global-setting', element:<GlobalSetting/>},
  {path:'change-password', element:<ChangePassword/>},
    { path: '*', element: <Navigate to="/dashboard" /> },
  ];

  const PublicRoutes = [
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: 'login', element: <LoginPage /> },
        { path: '/forgot', element: <ForgetForm /> },

        { path: '/reset-password/:otp', element: <ResetPassword /> },
        
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },

  ];

  const routes = useRoutes(isLoggedIn ? PrivateRoutes : PublicRoutes);

  return routes;
}
