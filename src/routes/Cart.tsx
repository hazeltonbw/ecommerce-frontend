import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCart, selectCart } from "../features/cart/cartSlice";
import CartProduct from "../components/CartProduct";
import type { CartProductT } from "../components/CartProduct";
import ProductsLink from "../components/ProductsLink";
import { selectIsLoggedIn } from "../features/auth/authSlice";

const Cart = () => {
  const cart = useAppSelector(selectCart);
  console.log(cart);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCart());
    }
  }, []);

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
    </>
  );
};

export default Cart;
