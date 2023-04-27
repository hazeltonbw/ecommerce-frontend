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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import Products from "./routes/Products";

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
      /* AUTH ROUTES */
      {
        path: "auth/register",
        element: <Register />,
        action: registrationFormAction,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      /* USER ROUTES */
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
      /* PRODUCT ROUTES */
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
