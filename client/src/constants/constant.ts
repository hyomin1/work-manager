// 데이터 자동 동기화 시간 300000ms(5분)
export const REFETCH_INTERVAL = 300_000;

// 라우팅 경로
export const ROUTES = {
  AUTH: {
    LOGIN: '/',
    SIGNUP: '/signup',
  },
  MENU: '/menu',

  WORKS: {
    LIST: '/works',
    CREATE: '/works/create',
    DAILY_WORK: '/works/dailyWork',
  },

  VEHICLES: {
    LIST: '/vehicles',
    CREATE: '/vehicles/create',
    SERVICE: '/vehicles/service',
  },

  SCHEDULE: '/schedule',

  ADMIN: {
    STATISTICS: '/admin/statistics',
    SETTINGS: '/admin/settings',
    MANAGE: '/admin/manage',
  },
};
