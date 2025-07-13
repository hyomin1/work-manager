import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './features/auth/LoginPage';
import { lazy } from 'react';
import { ROUTES } from './constants/constant';
import DrivingService from './pages/driving/service/DrivingService';
import WorkStatusPage from './features/work-status/WorkStatusPage';
import MenuPage from './features/menu/MenuPage';
import VehicleLogPage from './features/vehicle-log/VehicleLogPage';
import VehicleLogForm from './features/vehicle-log/components/VehicleLogForm';
import SchedulePage from './pages/schedule/SchedulePage';
import DailyWorkPage from './pages/dailyWork/DailyWorkPage';
import WorkStatusForm from './features/work-status/components/WorkStatusForm';

const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const UserManagePage = lazy(() => import('./pages/userManage/UserManagePage'));
const StatisticsPage = lazy(() => import('./pages/statistics/StatisticsPage'));
const SignupPage = lazy(() => import('./features/auth/SignupPage'));

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
        path: ROUTES.MENU,
        element: <MenuPage />,
      },
      {
        path: ROUTES.WORKS.LIST,
        element: <WorkStatusPage />,
      },
      {
        path: ROUTES.VEHICLES.LIST,
        element: <VehicleLogPage />,
      },
      {
        path: ROUTES.ADMIN.STATISTICS,
        element: <StatisticsPage />,
      },
      {
        path: ROUTES.WORKS.CREATE,
        element: <WorkStatusForm />,
      },
      {
        path: ROUTES.VEHICLES.CREATE,
        element: <VehicleLogForm />,
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
