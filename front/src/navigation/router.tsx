import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../pages/auth/Auth";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <div>404</div>,
      },
      {
        path: "/tv",
        element: <div>404</div>,
      },
      {
        path: "/list",
        element: <div>404</div>,
      },
    ],
  },
]);

export default router;
