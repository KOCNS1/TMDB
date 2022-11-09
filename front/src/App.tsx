import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getMeFn } from "./api/auth";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useStateContext } from "./context/auth/auth.context";
import { useCookies } from "react-cookie";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";

type Props = {};

const App = (props: Props) => {
  const stateContext = useStateContext();
  const [cookies] = useCookies(["logged_in"]);
  console.log(cookies);

  useQuery(["auth.me"], getMeFn, {
    //enabled: cookies.logged_in ? true : false,
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope:
          "https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/userinfo.profile",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <div className="App w-11/12 m-auto flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
