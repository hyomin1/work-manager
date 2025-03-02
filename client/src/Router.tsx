import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import { lazy } from "react";
import { ROUTES } from "./constants/constant";
import DrivingService from "./pages/driving/service/DrivingService";
import EmployeePage from "./pages/employee/EmployeePage";
import Register from "./pages/auth/Register";
import SelectPages from "./pages/SelectPages";
import DrivePage from "./pages/driving/DrivePage";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import EmployeeForm from "./pages/employee/EmployeeForm";
import DriveForm from "./pages/driving/DriveForm";
import SchedulePage from "./pages/schedule/SchedulePage";
import DailyWorkPage from "./pages/dailyWork/DailyWorkPage";

const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const UserManagePage = lazy(() => import("./pages/userManage/UserManagePage"));

// 라우팅 관리, 라우팅 path명, path에 해당할때 보여지는 화면 컴포넌트
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
        path: ROUTES.EMPLOYEES.DAILY_WORK,
        element: <DailyWorkPage />,
      },
    ],
  },
]);

export default router;
