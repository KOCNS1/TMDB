import { Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/auth/auth.context";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getMeFn } from "../../api/auth";
import FullScreenLoader from "../ui/FullScreenLoader/FullScreenLoader";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();
  const stateContext = useStateContext();

  console.log(cookies);
  console.log(stateContext);
  const { isLoading, isFetching, data } = useQuery(["authUser"], getMeFn, {
    retry: 1,

    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: { authUser: data } });
    },
  });

  const loading = isLoading || isFetching;
  if (loading) {
    return <FullScreenLoader />;
  }

  if (!cookies.logged_in || !data) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};
