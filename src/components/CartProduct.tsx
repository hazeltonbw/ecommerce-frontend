import React from "react";
import { removeFromCart, updateCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import { TbTrashOff } from "react-icons/tb";

export type CartProductT = {
  product_id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  qty: number;
  total?: string;
  img: string;
};

type Props = {
  product: CartProductT;
};

const CartProduct = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const updateProductInCart = async (qty: number) => {
    // TODO:
    // Maybe consider using this dispatch vvvvvvvvvvvvv
    // Put it in a try/catch block
    // Save it in a variable, call unwrap()
    // Check the data, if response is good then we can
    // display an animation or text saying product was updated in the cart

    try {
      dispatch(updateCart({ product_id: product.product_id, qty }));
    } catch (err) {
      console.error("ERROR IN updateProductInCart()", err);
    }
  };

  const removeProductFromCart = async (product_id: number) => {
    dispatch(removeFromCart(product_id));
  };

  return (
    <div className="flex flex-col items-center border-b-2 p-4 md:flex-row">
      <div className="min-w-[200px]">
        <img
          src={product.img}
          alt={product.title}
          className="m-auto max-h-[200px] max-w-[200px]"
        />
      </div>
      <div className="flex-auto basis-1/2 md:p-2">
        <h1 className="text-left text-xl font-semibold">{product.title}</h1>
        <p className="hidden md:block">{product.description}</p>
      </div>
      <div className="flex flex-auto flex-col items-center">
        <p className="font-semibold">Price: ${product.price}/ea</p>
        <div className="flex gap-1">
          <select
            name="quantity"
            id="quantity"
            className="rounded-lg bg-sky-900 px-4 py-2 text-white"
            // defaultValue={product.qty}
            value={product.qty}
            onChange={(e) => updateProductInCart(parseInt(e.target.value))}
          >
            {[...new Array(99)].map((_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </select>
          <button
            className="text-white"
            onClick={() => removeProductFromCart(product.product_id)}
          >
            <TbTrashOff size={24} title="Remove from cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
