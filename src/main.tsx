import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root, { loader as rootLoader } from "./routes/Root";
import User, { loader as userLoader } from "./routes/User";
import ErrorPage from "./error-page";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Users, { loader as usersLoader } from "./routes/Users";
import { action as registrationFormAction } from "./components/RegisterForm";
import { loginAction } from "./components/LoginForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth/register",
        element: <Register />,
        action: registrationFormAction,
      },
      {
        path: "auth/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "users/:user_id",
        element: <User />,
        loader: userLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
