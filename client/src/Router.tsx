import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./components/Main";
import Input from "./components/Input";
import Admin from "./components/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "/input",
        element: <Input />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

export default router;
