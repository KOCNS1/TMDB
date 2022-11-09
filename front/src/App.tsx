import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getMeFn } from "./api/auth";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useStateContext } from "./context/auth/auth.context";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import Search from "./components/Search";

type Props = {};

const App = (props: Props) => {
  const stateContext = useStateContext();
  const [openSearch, setOpenSearch] = useState(false);

  const handler = (e: KeyboardEvent): void => {
    if (e.metaKey && e.key === "k") {
      setOpenSearch(true);
    }
  };

  useQuery(["auth.me"], getMeFn, {
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

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  //if (openSearch) return <Search open={openSearch} setOpen={setOpenSearch} />;

  return (
    <div className="App w-11/12 m-auto flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
        {openSearch && <Search open={openSearch} setOpen={setOpenSearch} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
