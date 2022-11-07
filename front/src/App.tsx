import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="bg-gray-900">
      <div className="App w-11/12 m-auto flex flex-col h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
