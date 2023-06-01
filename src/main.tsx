import ReactDOM from "react-dom/client";
import "./index.css";
import Root, { loader as rootLoader } from "./routes/Root";
import User, { loader as userLoader } from "./routes/User";
import ErrorPage from "./error-page";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Users, { loader as usersLoader } from "./routes/Users";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import Products from "./routes/Products";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import Orders from "./routes/Orders";
import Order from "./routes/Order";
import Confirmation from "./routes/Confirmation";
const persistor = persistStore(store);

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
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
