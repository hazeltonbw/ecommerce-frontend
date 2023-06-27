import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecentOrder, getOrderById } from "../features/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectOrder } from "../features/orders/ordersSlice";
import type { Order } from "../features/orders/ordersSlice";

const OrderInfo = () => {
  const { order_id } = useParams();
  const dispatch = useAppDispatch();
  const order: Order = useAppSelector(selectOrder);

  useEffect(() => {
    const getOrder = async () => {
      dispatch(getOrderById(Number(order_id)));
    };
    const getRecentOrder = async () => {
      dispatch(fetchRecentOrder());
    };
    // This is called when the route /orders/:order_id is matched
    if (order_id != null) getOrder();
    // This is called for our Confirmation page
    else getRecentOrder();
  }, [order_id]);

  if (order != null)
    return (
      <div>
        <h1 className="text-xl">
          Your order id is: <span className="font-bold">{`${order.order_id}`}</span>
        </h1>
      </div>
    );
  else
    return (
      <div>
        <h1>Couldn&apos;t find that order, sorry.</h1>
      </div>
    );
};

export default OrderInfo;
