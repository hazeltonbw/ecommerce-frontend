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
import { getTotal } from "../features/cart/cartSlice";

const Cart = () => {
  const cart = useAppSelector(selectCart);
  console.log(cart);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  useEffect(() => {
    dispatch(getTotal());
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
    <>
      <h1 className="text-2xl text-center border-b-2 border-black leading-10">
        Your Cart
      </h1>
      {cart.map((product: CartProductT) => (
        <CartProduct product={product} key={product.product_id} />
      ))}
      <h1 className="text-xl">{`Total: $${totalPrice}`}</h1>
    </>
  );
};

export default Cart;
