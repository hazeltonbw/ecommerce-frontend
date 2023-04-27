import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
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
  const user = useAppSelector(selectUser);

  console.log(user, "USER INFO");
  // console.log(data, "data!!!!!!!!");

  return (
    <div className="w-full min-h-full flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
