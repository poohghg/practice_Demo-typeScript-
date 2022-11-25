import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter, useRoutes } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
