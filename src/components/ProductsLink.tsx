import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductsLink = () => {
  return (
    <div>
      <Link
        className="flex 
        w-full items-center justify-center 
        gap-2 rounded-xl border-2 border-gray-800
        bg-gray-800 p-4 
        text-white shadow-lg 
        shadow-gray-800/25 transition duration-150 ease-out hover:-translate-y-1
        hover:border-sky-700 hover:bg-sky-700 hover:shadow-gray-800/50 hover:ease-in
        "
        to="/products"
      >
        <span>View our amazing products</span>
        <AiOutlineArrowRight aria-label="arrow right" />
      </Link>
    </div>
  );
};

export default ProductsLink;
