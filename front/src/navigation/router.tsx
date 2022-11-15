import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Validate from "../components/auth/Validate";
import { RequireAuth } from "../components/auth/RequireAuth";
import ContentDetails from "../pages/tmdb/details/ContentDetails";
import Auth from "../pages/auth/Auth";
import Home from "../pages/Home";
import Profile from "../pages/user/Profile";
import { loader as popularLoader } from "../components/tmdb/popular/Popular";
import { type QueryClient } from "@tanstack/react-query";

export const getRouter = (queryClient: QueryClient) => {
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
          loader: popularLoader(queryClient),
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
  return router;
};
