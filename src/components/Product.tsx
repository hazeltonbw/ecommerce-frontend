export type Product = {
  title: string;
  price: string;
  description: string;
  imgURL: string;
  product_id: number;
  category: string;
};

type Props = {
  product: Product;
};
const Product = ({ product }: Props) => {
  return (
    <div className="w-full sm:max-w-xs rounded overflow-hidden shadow-lg p-4">
      <div className="sm:h-[400px] flex items-center">
        <img
          src={product.imgURL}
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
      <div className="flex gap-2">
        <input
          type="number"
          className="flex-none w-[7ch]"
          placeholder="1"
          min={1}
          max={99}
          defaultValue={1}
        ></input>
        {/* TODO: Make this button dispatch an action to add the product to the cart.*/}
        <button className="w-full text-white basis-3/4">Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
