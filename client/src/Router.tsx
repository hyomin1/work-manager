import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import { lazy } from 'react';
import { ROUTES } from './constants/constant';
import DrivingService from './pages/driving/service/DrivingService';
import WorkStatusPage from './pages/workStatus/WorkStatusPage';
import SelectPages from './pages/SelectPages';
import DrivePage from './pages/driving/DrivePage';
import EmployeeForm from './pages/workStatus/EmployeeForm';
import DriveForm from './pages/driving/DriveForm';
import SchedulePage from './pages/schedule/SchedulePage';
import DailyWorkPage from './pages/dailyWork/DailyWorkPage';

const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const UserManagePage = lazy(() => import('./pages/userManage/UserManagePage'));
const StatisticsPage = lazy(() => import('./pages/statistics/StatisticsPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));

const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: <App />,
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
      {
        path: ROUTES.AUTH.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <SelectPages />,
      },
      {
        path: ROUTES.WORKS.LIST,
        element: <WorkStatusPage />,
      },
      {
        path: ROUTES.VEHICLES.LIST,
        element: <DrivePage />,
      },
      {
        path: ROUTES.ADMIN.STATISTICS,
        element: <StatisticsPage />,
      },
      {
        path: ROUTES.WORKS.CREATE,
        element: <EmployeeForm />,
      },
      {
        path: ROUTES.VEHICLES.CREATE,
        element: <DriveForm />,
      },
      {
        path: ROUTES.VEHICLES.SERVICE,
        element: <DrivingService />,
      },
      {
        path: ROUTES.ADMIN.SETTINGS,
        element: <AdminPage />,
      },
      {
        path: ROUTES.SCHEDULE,
        element: <SchedulePage />,
      },
      {
        path: ROUTES.ADMIN.MANAGE,
        element: <UserManagePage />,
      },
      {
        path: ROUTES.WORKS.DAILY_WORK,
        element: <DailyWorkPage />,
      },
    ],
  },
]);

export default router;
