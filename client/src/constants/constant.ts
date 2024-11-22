export const REFETCH_INTERVAL = 300_000;
export const ROUTES = {
  AUTH: {
    LOGIN: "/",
    REGISTER: "/register",
  },
  DASHBOARD: "/dashboard",

  EMPLOYEES: {
    LIST: "/employees",
    CREATE: "/employees/create",
  },

  VEHICLES: {
    LIST: "/vehicles",
    CREATE: "/vehicles/create",
    SERVICE: "/vehicles/service",
  },

  SCHEDULE: "/schedule",

  ADMIN: {
    STATISTICS: "/admin/statistics",
    SETTINGS: "/admin/settings",
    MANAGE: "/admin/manage",
  },
};
