import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./screens/Main";
import InputInform from "./screens/InputInform";
import Admin from "./screens/Admin";
import Login from "./auth/Login";
import Register from "./auth/Register";

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
        path: "/main",
        element: <Main />,
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
