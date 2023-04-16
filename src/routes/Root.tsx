import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const loader = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    return fetch(`${API_URL}`);
  } catch (err) {
    return { error: err, message: "Error fetching main page." };
  }
};

function Root() {
  const loaderData = useLoaderData();
  //console.log(loaderData, "req.user from server");

  const data = loaderData || {};
  console.log(data, "data!!!!!!!!");
  const isLoggedIn = undefined;
  console.log(isLoggedIn, "Are we logged in?");
  return (
    <div className="w-full min-h-full flex flex-col">
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
