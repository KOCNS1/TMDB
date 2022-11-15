import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer/Footer";
import Header from "./components/ui/Header/Header";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import Search from "./components/tmdb/search/Search";

const App = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const handler = (e: KeyboardEvent): void => {
    if (e.metaKey && e.key === "k") {
      setOpenSearch(true);
    }
  };

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

  return (
    <div className="App w-11/12 mx-auto flex flex-col min-h-screen">
      <Header setOpen={setOpenSearch} />
      <main className="flex-1 h-full">
        <Outlet />
        {openSearch && <Search open={openSearch} setOpen={setOpenSearch} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
