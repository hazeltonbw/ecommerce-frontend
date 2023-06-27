import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchRecentOrder, selectOrder } from "../features/orders/ordersSlice";
import type { Order } from "../features/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import ProductsLink from "../components/ProductsLink";
import { Unauthenticated, selectIsLoggedIn } from "../features/auth/authSlice";
import OrderInfo from "../components/OrderInfo";

const Confirmation = () => {
  const dispatch = useAppDispatch();
  const recentOrder: Order & Unauthenticated = useAppSelector(selectOrder);
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    const getRecentOrder = async () => {
      dispatch(fetchRecentOrder());
    };
    if (!isLoggedIn) navigate("/auth/login");
    if (!recentOrder) getRecentOrder();
  }, []);

  if (recentOrder == null) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1>No recent orders found!</h1>
        <ProductsLink />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <p>Thank you for your order. </p>
      <div className="flex">
        <h1 className="text-xl">
          <OrderInfo />
        </h1>
      </div>
    </div>
  );
};

export default Confirmation;
