import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import EmployeeMain from "./screens/employee/EmployeeMain";
import InputInform from "./screens/InputInform";
import Admin from "./screens/Admin";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SelectPages from "./screens/SelectPages";
import DriveMain from "./screens/driving/DriveMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/select",
        element: <SelectPages />,
      },
      {
        path: "/employee-status",
        element: <EmployeeMain />,
      },
      {
        path: "/driving-status",
        element: <DriveMain />,
      },
      {
        path: "/input",
        element: <InputInform />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

export default router;
