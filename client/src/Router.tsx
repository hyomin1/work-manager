import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './screens/auth/Login';
import { lazy } from 'react';

const Register = lazy(() => import('./screens/auth/Register'));
const SelectPages = lazy(() => import('./screens/SelectPages'));
const EmployeeMain = lazy(() => import('./screens/employee/EmployeeMain'));
const EmployeeInput = lazy(() => import('./screens/employee/EmployeeInput'));
const DriveMain = lazy(() => import('./screens/driving/DriveMain'));
const DriveInput = lazy(() => import('./screens/driving/DriveInput'));
const StatisticsMain = lazy(
  () => import('./screens/statistics/StatisticsMain')
);
const ScheduleMain = lazy(() => import('./screens/schedule/ScheduleMain'));
const Admin = lazy(() => import('./screens/admin/Admin'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/home',
        element: <SelectPages />,
      },
      {
        path: '/employee-status',
        element: <EmployeeMain />,
      },
      {
        path: '/driving-status',
        element: <DriveMain />,
      },
      {
        path: '/statistics',
        element: <StatisticsMain />,
      },
      {
        path: '/employee-input',
        element: <EmployeeInput />,
      },
      {
        path: '/driving-input',
        element: <DriveInput />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/schedule',
        element: <ScheduleMain />,
      },
    ],
  },
]);

export default router;
