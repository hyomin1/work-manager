import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/Login';
import { lazy } from 'react';

const Register = lazy(() => import('./pages/auth/Register'));
const SelectPages = lazy(() => import('./pages/SelectPages'));
const EmployeePage = lazy(() => import('./pages/employee/EmployeePage'));
const EmployeeForm = lazy(() => import('./pages/employee/EmployeeForm'));
const DrivePage = lazy(() => import('./pages/driving/DrivePage'));
const DriveForm = lazy(() => import('./pages/driving/DriveForm'));
const StatisticsPage = lazy(() => import('./pages/statistics/StatisticsPage'));
const SchedulePage = lazy(() => import('./pages/schedule/SchedulePage'));
const Admin = lazy(() => import('./pages/admin/Admin'));

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
        element: <EmployeePage />,
      },
      {
        path: '/driving-status',
        element: <DrivePage />,
      },
      {
        path: '/admin/statistics',
        element: <StatisticsPage />,
      },
      {
        path: '/employee-input',
        element: <EmployeeForm />,
      },
      {
        path: '/driving-input',
        element: <DriveForm />,
      },
      {
        path: '/admin/settings',
        element: <Admin />,
      },
      {
        path: '/schedule',
        element: <SchedulePage />,
      },
    ],
  },
]);

export default router;
