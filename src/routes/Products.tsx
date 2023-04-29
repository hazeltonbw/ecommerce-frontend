import { useEffect } from "react";
import { getProducts, selectProducts } from "../features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppDispatch } from "../store";
import Product from "../components/Product";

const Products = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);

  // Run this on page load
  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
    };
    if (products.length === 0) fetchProducts();
  }, [products]);

  return products.length > 0 ? (
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {products.length > 0 &&
        products.map((product) => (
          <Product key={product.product_id} product={product} />
        ))}
    </div>
  ) : (
    <div>No products found!</div>
  );
};

export default Products;
