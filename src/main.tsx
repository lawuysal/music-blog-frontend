import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TokenContextProvider } from "./context/TokenContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </TokenContextProvider>
  </React.StrictMode>,
);
