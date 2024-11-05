import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import { lazy } from "react";
import { ROUTES } from "./constants/constant";

const Register = lazy(() => import("./pages/auth/Register"));
const SelectPages = lazy(() => import("./pages/SelectPages"));
const EmployeePage = lazy(() => import("./pages/employee/EmployeePage"));
const EmployeeForm = lazy(() => import("./pages/employee/EmployeeForm"));
const DrivePage = lazy(() => import("./pages/driving/DrivePage"));
const DriveForm = lazy(() => import("./pages/driving/DriveForm"));
const StatisticsPage = lazy(() => import("./pages/statistics/StatisticsPage"));
const SchedulePage = lazy(() => import("./pages/schedule/SchedulePage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));

const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: ROUTES.AUTH.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <SelectPages />,
      },
      {
        path: ROUTES.EMPLOYEES.LIST,
        element: <EmployeePage />,
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
        path: ROUTES.EMPLOYEES.CREATE,
        element: <EmployeeForm />,
      },
      {
        path: ROUTES.VEHICLES.CREATE,
        element: <DriveForm />,
      },
      {
        path: ROUTES.ADMIN.SETTINGS,
        element: <AdminPage />,
      },
      {
        path: ROUTES.SCHEDULE,
        element: <SchedulePage />,
      },
    ],
  },
]);

export default router;
