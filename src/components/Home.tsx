import ProductsLink from "./ProductsLink";

type Props = {};

const Home = (props: Props) => {
  return (
    <div
      className="flex flex-1 flex-col p-8 gap-4 justify-center items-center
    bg-gradient-to-r from-cyan-600 to-sky-500/50 text-white
    md:flex-row md:p-0
    "
    >
      <div
        className="flex flex-col max-w-sm items-center gap-4 text-center 
      md:items-start md:text-left"
      >
        <h1 className="text-4xl w-[15ch]">
          eCommerce
          <span className="font-extrabold font-lobster"> Shopping </span>
          App
        </h1>
        <p className="text-xl font-bold ">
          Shop with ease on our ecommerce website, offering a diverse selection
          of products at competitive prices.
        </p>
        <ProductsLink />
      </div>
      <div className="flex flex-row-reverse flex-nowrap items-center w-3/4 md:w-1/4 lg:w-1/6 place-content-start">
        <img
          src="products.webp"
          alt="Products"
          className="rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
