import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductsLink = () => {
  return (
    <div>
      <Link
        className="p-4 
        border-2 border-gray-800 rounded-xl 
        flex items-center gap-2 justify-center
        bg-gray-800 text-white 
        shadow-lg shadow-gray-800/25 
        hover:shadow-gray-800/50 hover:ease-in hover:-translate-y-1 hover:bg-sky-700 hover:border-sky-700
        transition duration-150 ease-out w-full
        "
        to="/products"
      >
        <span>View our amazing products</span>
        <AiOutlineArrowRight />
      </Link>
    </div>
  );
};

export default ProductsLink;
