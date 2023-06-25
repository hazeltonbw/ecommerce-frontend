import React from "react";
import { toast } from "react-hot-toast";
import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import QuantityPicker from "./QuantityPicker";

export type Product = {
  title: string;
  price: number;
  description: string;
  img: string;
  product_id: number;
  category: string;
};

type Props = {
  product: Product;
};
const Product = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const addProductToCart = async (qty: number) => {
    try {
      toast.promise(
        dispatch(addToCart({ ...product, qty: qty })), {
        loading: `Adding ${product.title} to cart...`,
        success: `(${qty}) ${product.title} added to cart.`,
        error: `Could not add ${product.title} to cart. Please try again.`
      }
      );
    } catch (err) {
      console.error(err)
    }
  };
  return (
    <div className="flex flex-col w-full overflow-hidden rounded shadow-lg sm:max-w-xs p-4 relative">
      <img src={product.img} alt={product.title} className="sm:max-h-[200px] object-contain" />
      <div className="px-6 py-4 flex-1">
        <h1 className="capitalize">
          {product.title}
        </h1>
        <p className="capitalize font-thin">{product.category}</p>
        <p className="font-bold">${product.price}</p>
      </div>
      <QuantityPicker qty={1} inCart={false} buttonAction={addProductToCart} />
    </div>
  );
};

export default Product;
