import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";

import { useTheme } from "./theme";
import { ToastProvider } from "./toast/toast";

const { setInitialTheme, toggleTheme } = useTheme();

setInitialTheme();

document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

ReactDOM.createRoot(document.getElementById("root") as any).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
      <Toaster position="top-center" />
    </ToastProvider>
  </React.StrictMode>
);
