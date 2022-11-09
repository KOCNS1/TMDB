import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Validate from "../components/auth/Validate";
import { RequireAuth } from "../components/RequireAuth";
import Search from "../components/Search";
import ContentDetails from "../components/tmdb/details/ContentDetails";
import Auth from "../pages/auth/Auth";
import Home from "../pages/Home";
import Profile from "../pages/user/Profile";

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
        path: "",
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
        element: (
          <RequireAuth>
            <div>404</div>
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "/tmdb/details/:type/:id",
        element: <ContentDetails />,
      },
      {
        path: "/validate",
        element: <Validate />,
      },
    ],
  },
]);

export default router;
