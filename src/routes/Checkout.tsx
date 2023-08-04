import React, { useEffect } from "react";
import { CartProductT } from "../components/CartProduct";
import { selectCart, selectTotalPrice } from "../features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import {
  createPaymentIntent,
  selectClientSecret,
} from "../features/checkout/checkoutSlice";
import ProductsLink from "../components/ProductsLink";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_KEY);

const Checkout = () => {
  const cart: Array<CartProductT> = useAppSelector(selectCart);
  const total: number = useAppSelector(selectTotalPrice);
  const clientSecret = useAppSelector(selectClientSecret);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const createPaymentIntentAndNewOrder = async () => {
      // If this is the first time the customer is on the checkout page,
      // create a new order in the database
      // if (new_order_id == null) {
      //   await dispatch(createOrder());
      // }
      await dispatch(createPaymentIntent({ total: total }));
    };
    createPaymentIntentAndNewOrder();
  }, []);

  const { status } = useAppSelector((state) => state.checkout);
  const stripeOptions = {
    clientSecret: clientSecret,
  };

  if (cart == null || cart.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sky-500">
        <h1>You have nothing in your cart to checkout!</h1>
        <ProductsLink />
      </div>
    );
  }

  return (
    <div className="bg-sky-200">
      <div className="flex flex-col sm:p-16 lg:flex-row lg:gap-4">
        <div className="flex flex-col gap-2 rounded-lg bg-white p-4 lg:flex-1">
          <h1 className="border-b-2 border-gray-200 text-center text-2xl lg:text-start">
            Your order
          </h1>
          {cart?.map((product: CartProductT) => (
            <div
              key={product.product_id}
              className="flex flex-col sm:flex-row border-b-2 border-b-gray-200 p-2"
            >
              <div className="w-[100px] flex-shrink-0 self-center">
                <img src={product.img} alt={product.title} />
              </div>
              <div className="flex flex-col sm:ml-8 items-start p-4">
                <h1>{product.title}</h1>
                <p className="font-thin">Qty: {product.qty}</p>
                <p className="font-bold">
                  ${(product.qty * product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <h1 className="text-end text-xl font-bold">
            Total: ${total.toFixed(2)}
          </h1>
        </div>

        {status === "succeeded" && clientSecret !== "" && (
          <Elements stripe={stripePromise} options={stripeOptions}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
