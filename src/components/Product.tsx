import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import QuantityPicker from "./QuantityPicker";

export type Product = {
  title: string;
  price: string;
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
      dispatch(addToCart({ ...product, qty }));
    } catch (err) {}
  };
  return (
    <div className="w-full sm:max-w-xs rounded overflow-hidden shadow-lg">
      <div className="sm:h-[400px] flex items-center">
        <img
          src={product.img}
          alt={product.title}
          className="sm:max-h-[400px] w-full"
        />
      </div>
      <div className="px-6 py-4">
        <h1 className="capitalize font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">
          {product.title}
        </h1>
        <p className="capitalize">{product.category}</p>
        <p className="font-semibold">${product.price}</p>
      </div>
      <QuantityPicker qty={1} inCart={false} buttonAction={addProductToCart} />
    </div>
  );
};

export default Product;
