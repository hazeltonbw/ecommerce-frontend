import { removeFromCart, updateCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import QuantityPicker from "./QuantityPicker";

export type CartProductT = {
  product_id: number;
  title: string;
  price: string;
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
      console.log("ERROR IN updateProductInCart()", err);
    }
  };

  const removeProductFromCart = async (product_id: number) => {
    dispatch(removeFromCart(product_id));
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row border-b-2 p-4">
      <img
        src={product.img}
        alt={product.title}
        className="max-h-[200px] max-w-[200px]"
      />
      <div className="md:p-2">
        <h1 className="text-xl font-semibold text-center">{product.title}</h1>
        <p className="hidden md:block">{product.description}</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-semibold">Price: ${product.price}/ea</p>
        <QuantityPicker
          qty={product.qty}
          inCart={true}
          buttonAction={updateProductInCart}
        />
        <button
          className="w-full text-white"
          onClick={(e) => removeProductFromCart(product.product_id)}
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
