import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Root from "./routes/Root";
import User from "./routes/User";
import ErrorPage from "./error-page";
import Register from "./routes/Register";
// Vite has a different way to access environment variables
// https://vitejs.dev/guide/env-and-mode.html
// console.log(import.meta.env.VITE_API_URL);
const API_URL = import.meta.env.VITE_API_URL;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth/register",
        element: <Register />,
      },
      {
        path: "users/:user_id",
        element: <User />,
        loader: async function ({ params }) {
          return fetch(`${API_URL}/users/${params.user_id}`);
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
