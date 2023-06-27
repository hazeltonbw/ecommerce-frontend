import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  getOrderById,
  OrderDetails,
  ProductDetails,
  selectOrder,
} from "../features/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
type Props = {
  orderP?: OrderDetails | null;
};
const Order = ({ orderP }: Props) => {
  const { order_id } = useParams();
  const dispatch = useAppDispatch();
  const order = orderP != null ? orderP : useAppSelector(selectOrder);

  useEffect(() => {
    if (order == null && order_id != null) {
      dispatch(getOrderById(parseInt(order_id)));
    }
  }, [order]);

  return (
    <div className="flex flex-1 items-center justify-center sm:p-4">
      <div
        key={order.order_id}
        className="mb-4 flex flex-1 flex-col rounded-lg bg-white shadow-md shadow-sky-200"
      >
        <div className="flex justify-between rounded-t-lg bg-sky-200 p-2 sm:p-4">
          <div className="flex flex-col">
            <h1>Order placed: </h1>
            <p className="font-thin">{moment(order.date).calendar()}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="uppercase">
              Order# <span className="font-semibold">{order.order_id}</span>
            </p>
            <p className="font-semibold">Total: ${order.order_total}</p>
          </div>
        </div>
        {order.products.map((product: ProductDetails) => (
          <div
            key={product.product.product_id}
            className="flex flex-row gap-4 border-b-2 border-b-gray-100 p-4"
          >
            <div className="m-auto max-w-[50px] sm:block sm:max-w-[100px]">
              <img src={product.product.url} alt={product.product.title} />
            </div>
            <h1 className="flex-1 self-center font-semibold">
              {product.product.title.substring(0, 60)}
            </h1>
            <div className="flex items-center">
              <p>
                {product.qty} <span className="font-semibold">x</span> $
                {product.product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

export default Order;
