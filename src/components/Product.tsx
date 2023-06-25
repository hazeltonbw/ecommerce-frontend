import React from "react";
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
      // TODO:
      // Maybe consider using this dispatch vvvvvvvvvvvvv
      // Put it in a try/catch block
      // Save it in a variable, call unwrap()
      // Check the data, if response is good then we can
      // display an animation or text saying product was added to cart
      //dispatch(addToCart({ product_id: product.product_id, qty }));
      dispatch(addToCart({ ...product, qty: qty }));
    } catch (err) {
      console.error(err)
    }
  };
  return (
    <div className="flex flex-col w-full overflow-hidden rounded shadow-lg sm:max-w-xs p-4 justify-center">
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
