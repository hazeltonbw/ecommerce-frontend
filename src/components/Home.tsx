import ProductsLink from "./ProductsLink";

const Home = () => {
  return (
    <div
      className="flex flex-1 flex-col items-center 
      justify-center gap-4 bg-gradient-to-r
    from-cyan-600 to-sky-500/50 p-8 text-white
    md:flex-row md:p-0
    "
    >
      <div
        className="flex max-w-sm flex-col items-center gap-4 text-center 
      md:items-start md:text-left"
      >
        <h1 className="w-[15ch] text-4xl">
          eCommerce
          <span className="font-lobster font-extrabold"> Shopping </span>
          App
        </h1>
        <p className="text-xl font-bold ">
          Shop with ease on our ecommerce website, offering a diverse selection of products at
          competitive prices.
        </p>
        <ProductsLink />
      </div>
      <div className="flex w-3/4 flex-row-reverse flex-nowrap place-content-start items-center md:w-1/4 lg:w-1/6">
        <img src="products.webp" alt="Products" className="rounded-2xl shadow-lg" />
      </div>
    </div>
  );
};

export default Home;
