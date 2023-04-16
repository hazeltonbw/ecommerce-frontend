type Props = { isLoggedIn: boolean };

import { Link, redirect } from "react-router-dom";

const handleLogout = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  await fetch(`${API_URL}/auth/logout`, { method: "POST" });
  return redirect("/auth/login");
};

const Header = (props: Props) => {
  console.log(props.isLoggedIn);
  return (
    <header
      className="p-8 
    bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      <nav>
        <ul className="flex ">
          <li>
            <Link
              className="
        hover:shadow-gray-800/50 hover:ease-in hover:-translate-y-1 hover:bg-sky-700 hover:border-sky-700 hover:text-white
        transition duration-150 ease-out 
        rounded-lg
        p-4
            "
              to={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            {props.isLoggedIn ? (
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link
                className="
        hover:shadow-gray-800/50 hover:ease-in hover:-translate-y-1 hover:bg-sky-700 hover:border-sky-700 hover:text-white
        transition duration-150 ease-out 
        rounded-lg
        p-4
            "
                to={"/auth/login"}
              >
                Login
              </Link>
            )}
          </li>
          <li>
            <Link
              className="
        hover:shadow-gray-800/50 hover:ease-in hover:-translate-y-1 hover:bg-sky-700 hover:border-sky-700 hover:text-white
        transition duration-150 ease-out 
        rounded-lg
        p-4
            "
              to={"/auth/register"}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
