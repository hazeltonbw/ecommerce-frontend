import "./index.css";
// React
import React from "react";
import ReactDOM from "react-dom/client";
// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Pages & Components
import Users, { loader as usersLoader } from "./routes/Users";
import Home from "./components/Home";
import Login from "./routes/Login";
import User, { loader as userLoader } from "./routes/User";
import Register from "./routes/Register";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Products from "./routes/Products";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import Orders from "./routes/Orders";
import Order from "./routes/Order";
import Confirmation from "./routes/Confirmation";
import { BeatLoader } from "react-spinners";

// Persist Store
const persistor = persistStore(store);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      /* AUTH ROUTES */
      {
        path: "auth/register",
        element: <Register />,
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
      /* CART ROUTE */
      {
        path: "/cart",
        element: <Cart />,
      },
      /* CHECKOUT ROUTE */
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout/confirmation",
        element: <Confirmation />,
      },
      /* ORDERS ROUTE */
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:order_id",
        element: <Order />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={<BeatLoader />} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
