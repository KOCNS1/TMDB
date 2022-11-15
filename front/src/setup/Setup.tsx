import React from "react";
import { RouterProvider } from "react-router-dom";
import "../index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContextProvider } from "../context/auth/auth.context";
import { getRouter } from "../navigation/router";

const queryClient = new QueryClient();

// export const createStore = () => {
//   return; /* store */
// };

export const createRouter = () => {
  return getRouter(queryClient);
};

export const createApp = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <StateContextProvider>
          <RouterProvider router={getRouter(queryClient)} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <ReactQueryDevtools />
        </StateContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};
