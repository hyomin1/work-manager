import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { lazy } from 'react';
import { ROUTES } from './constants/constant';

// ========================================
// ✅ 메인 번들: 초기 로드에 필수적인 것만!
// ========================================
import LoginPage from './features/auth/LoginPage';
import MenuPage from './features/menu/MenuPage';

// ========================================
// 🔥 나머지는 전부 lazy (필요할 때만 로드)
// ========================================
// 회원가입 (1회성)
const SignupPage = lazy(() => import('./features/auth/SignupPage'));

// 근무 관련
const WorkStatusPage = lazy(
  () => import('./features/work-status/WorkStatusPage')
);
const WorkStatusForm = lazy(
  () => import('./features/work-status/components/WorkStatusForm')
);
const DailyWorkPage = lazy(() => import('./features/dailyWork/DailyWorkPage'));

// 차량 관련
const VehicleLogPage = lazy(
  () => import('./features/vehicle-log/VehicleLogPage')
);
const VehicleLogForm = lazy(
  () => import('./features/vehicle-log/components/VehicleLogForm')
);
const DrivingService = lazy(
  () => import('./features/vehicle-log/MaintenancePage')
);

// 캘린더
const SchedulePage = lazy(() => import('./features/schedule/SchedulePage'));

// 관리자
const AdminPage = lazy(() => import('./features/admin/AdminPage'));
const StatisticsPage = lazy(
  () => import('./features/statistics/StatisticsPage')
);
const UserManagePage = lazy(
  () => import('./features/userManage/UserManagePage')
);

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
