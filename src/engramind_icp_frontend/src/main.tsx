import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { useTheme } from "./theme";

const { setInitialTheme, toggleTheme } = useTheme();

setInitialTheme();

document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

ReactDOM.createRoot(document.getElementById("root") as any).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
