import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getCart,
  selectCart,
  selectTotalPrice,
} from "../features/cart/cartSlice";
import CartProduct from "../components/CartProduct";
import type { CartProductT } from "../components/CartProduct";
import ProductsLink from "../components/ProductsLink";
import { selectIsLoggedIn } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const Cart = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const cart = useAppSelector(selectCart);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const totalPrice = useAppSelector(selectTotalPrice).toFixed(2); // Max 2 decimals

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCart());
    }
  }, []);

  useMemo(() => dispatch(getTotal()), [cart]);
  // useEffect(() => {}, [cart]);

  if (cart === null || cart.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <h1 className="text-2xl text-center leading-10">Your cart is empty!</h1>
        <ProductsLink />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl text-center border-b-2 border-black leading-10">
        Your Cart
      </h1>
      {cart?.map((product: CartProductT) => (
        <CartProduct product={product} key={product.product_id} />
      ))}
      <div
        className="flex 
        items-center
        justify-end
        md:justify-end
        gap-4
        fixed
        bg-gray-800
        text-white
        inset-x-0
        bottom-0
        p-4
        rounded-lg
        "
      >
        <h1 className="hidden sm:block">
          {cart.reduce(
            (acc: number, product: CartProductT) => acc + product.qty,
            0
          )}{" "}
          item(s)
        </h1>
        <h1 className="text-xl">{`Subtotal: $${totalPrice}`}</h1>
        <Link
          to="/checkout"
          className="flex gap-1 items-center text-xl bg-sky-700 px-4 py-2 rounded-lg"
        >
          Checkout
          <AiOutlineArrowRight size={"1.5rem"} />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
