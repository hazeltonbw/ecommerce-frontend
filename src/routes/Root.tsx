import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { selectUser } from "../features/auth/authSlice";

export const loader = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    return axios.get(API_URL, { withCredentials: true });
  } catch (err) {
    return { error: err, message: "Error fetching main page." };
  }
};

function Root() {
  const loaderData = useLoaderData();
  //console.log(loaderData, "req.user from server");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useAppSelector(selectUser);

  console.log(user, "USER INFO");
  // const { data } = loaderData || {};
  // console.log(data, "data!!!!!!!!");

  useEffect(() => {
    console.log(user !== null);
    setIsLoggedIn(user !== null);
  }, [user]);

  console.log(isLoggedIn);

  return (
    <div className="w-full min-h-full flex flex-col">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
