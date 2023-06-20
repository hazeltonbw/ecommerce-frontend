import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCart, selectCart, selectTotalPrice } from "../features/cart/cartSlice";
import CartProduct from "../components/CartProduct";
import type { CartProductT } from "../components/CartProduct";
import ProductsLink from "../components/ProductsLink";
import { clearState, logout, selectIsLoggedIn } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Cart = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const cart = useAppSelector(selectCart);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const totalPrice = useAppSelector(selectTotalPrice).toFixed(2); // Max 2 decimals

  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn) {
        const response = await dispatch(getCart()).unwrap();
        if (response.error === "Unauthenticated") {
          // Old session still active,
          // update Redux state
          dispatch(logout());
          dispatch(clearState());
        }
      }
    };

    fetchCart();
  }, []);

  if (cart == null || cart?.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-center text-2xl leading-10">Your cart is empty!</h1>
        <ProductsLink />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="border-b-2 border-black text-center text-2xl leading-10">Your Cart</h1>
      {cart?.map((product: CartProductT) => (
        <CartProduct product={product} key={product.product_id} />
      ))}
      <div
        className="fixed 
        inset-x-0
        bottom-0
        flex
        items-center
        justify-end
        gap-4
        rounded-lg
        bg-gray-800
        p-4
        text-white
        md:justify-end
        "
      >
        <Link
          to="/products"
          className="hidden items-center gap-1 self-start rounded-lg bg-sky-700 px-4 py-2 text-xl md:flex"
        >
          <AiOutlineArrowLeft size={24} />
          Continue shopping
        </Link>
        <h1 className="hidden sm:block">
          {cart.reduce((acc: number, product: CartProductT) => acc + product.qty, 0)} item(s)
        </h1>
        <h1 className="text-xl">{`Subtotal: $${totalPrice}`}</h1>
        <Link
          to="/checkout"
          className="flex items-center gap-1 rounded-lg bg-sky-700 px-4 py-2 text-xl"
        >
          Checkout
          <AiOutlineArrowRight size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
