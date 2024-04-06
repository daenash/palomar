import ReactDOM from "react-dom/client";
import React from "react";
import "./style.css";
import { RouterProvider } from "./providers/Router.provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>
);
