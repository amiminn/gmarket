import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
import { routes } from "./route";

const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
