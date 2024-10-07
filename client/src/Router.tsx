import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import EmployeeMain from "./screens/employee/EmployeeMain";
import InputInform from "./screens/employee/InputInform";
import Admin from "./screens/Admin";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import SelectPages from "./screens/SelectPages";
import DriveMain from "./screens/driving/DriveMain";
import DriveInput from "./screens/driving/DriveInput";

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
        path: "/home",
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
        path: "/employee-input",
        element: <InputInform />,
      },
      {
        path: "/driving-input",
        element: <DriveInput />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

export default router;
