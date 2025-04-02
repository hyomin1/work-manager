import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/auth/LoginPage";
import { lazy } from "react";
import { ROUTES } from "./constants/constant";
import DrivingService from "./pages/driving/service/DrivingService";
import WorkStatusPage from "./pages/workStatus/WorkStatusPage";
import SelectPages from "./pages/SelectPages";
import DrivePage from "./pages/driving/DrivePage";
import EmployeeForm from "./pages/workStatus/EmployeeForm";
import DriveForm from "./pages/driving/DriveForm";
import SchedulePage from "./pages/schedule/SchedulePage";
import DailyWorkPage from "./pages/dailyWork/DailyWorkPage";

const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const UserManagePage = lazy(() => import("./pages/userManage/UserManagePage"));
const StatisticsPage = lazy(() => import("./pages/statistics/StatisticsPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));

// 라우팅 관리, 라우팅 path명, path에 해당할때 보여지는 화면 컴포넌트
const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: ROUTES.AUTH.REGISTER,
        element: <RegisterPage />,
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
