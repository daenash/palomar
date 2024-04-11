import ReactDOM from "react-dom/client";
import React from "react";
import "./style.css";
import { HomePage } from "./pages/home/Home.page";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
