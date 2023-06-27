import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getOrders, OrderDetails, selectOrders } from "../features/orders/ordersSlice";
import { logout, clearState, selectIsLoggedIn } from "../features/auth/authSlice";
import ProductsLink from "../components/ProductsLink";
import { useNavigate } from "react-router-dom";
import Order from "./Order";

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (isLoggedIn) {
        const response = await dispatch(getOrders()).unwrap();
        if (response.error) {
          // Old session still active,
          // update Redux state
          dispatch(logout());
          dispatch(clearState());
          navigate("/auth/login");
        }
      }
    };
    fetchOrders();
  }, []);

  if (orders != null && orders.length) {
    return (
      <div className="flex flex-col p-2 sm:p-8">
        <h1 className="text-2xl font-semibold">Your orders</h1>
        {orders.map((order: OrderDetails) => (
          <Order key={order.order_id} orderP={order} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      You don&apos;t have any orders! Start shopping now
      <ProductsLink />
    </div>
  );
};

export default Orders;
