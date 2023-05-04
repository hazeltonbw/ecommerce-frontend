import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  logout,
  selectFirstName,
  selectIsLoggedIn,
  clearState,
} from "../features/auth/authSlice";

import imgUrl from "../assets/Shoppo.png";

const Header = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const fname = useAppSelector(selectFirstName);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuIsOpen(false);
  };

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    setIsDisabled(true);
    event.preventDefault();
    dispatch(logout());
    dispatch(clearState());
    setIsDisabled(false);
  };

  return (
    <header className="p-8 bg-gray-200 dark:bg-gray-800 dark:text-white flex justify-between items-center">
      <div className="flex ">
        <img src={imgUrl} alt="Shoppo Logo" className="w-16" />
        {isLoggedIn && (
          <h2 className="capitalize p-4 text-center">{`Hello ${fname}!`}</h2>
        )}
      </div>
      <nav className={`flex justify-end px-4`}>
        <ul
          className={
            mobileMenuIsOpen
              ? `flex flex-col bg-gray-800 text-black absolute 
              top-0 right-0 w-full h-full p-16 items-center justify-center 
              gap-12 z-10 border-8 border-sky-700 text-white rounded-xl`
              : `hidden md:flex`
          }
        >
          <li className="w-full">
            <Link
              to={"/"}
              onClick={closeMobileMenu}
              className="
                hover:shadow-gray-800/50 hover:bg-sky-700 hover:border-sky-700 hover:text-white
                rounded-lg p-4 block text-center"
            >
              Home
            </Link>
          </li>
          <li className="w-full">
            <Link
              to="/products"
              onClick={closeMobileMenu}
              className="
              hover:shadow-gray-800/50 hover:bg-sky-700 hover:border-sky-700 hover:text-white
                rounded-lg p-4 block text-center"
            >
              Products
            </Link>
          </li>
          {
            // Don't show the register button while the user is logged in
            !isLoggedIn && (
              <li className="w-full">
                <Link
                  to={"/auth/register"}
                  onClick={closeMobileMenu}
                  className="
                hover:shadow-gray-800/50 hover:bg-sky-700 hover:border-sky-700 hover:text-white
                rounded-lg p-4 block text-center"
                >
                  Register
                </Link>
              </li>
            )
          }
          <li className="w-full">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={(e) => {
                  handleLogout(e);
                  setMobileMenuIsOpen(false);
                }}
                aria-disabled={isDisabled}
                className="
                hover:shadow-gray-800/50 hover:bg-sky-700 hover:border-sky-700 hover:text-white
                shadow-none p-4 text-inherit w-full block text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/auth/login"}
                onClick={closeMobileMenu}
                className="
        hover:shadow-gray-800/50 hover:bg-sky-700 hover:border-sky-700 hover:text-white
        rounded-lg
        p-4 block text-center
            "
              >
                Login
              </Link>
            )}
          </li>
          <li className="w-full">
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="
              hover:shadow-gray-800/50 hover:bg-sky-700 hover:border-sky-700 hover:text-white
                rounded-lg p-4 block text-center"
            >
              Cart
            </Link>
          </li>
        </ul>

        <div
          className={
            mobileMenuIsOpen
              ? "cursor-pointer absolute top-[3.3rem] right-12 z-10 "
              : "flex md:hidden cursor-pointer"
          }
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        >
          <div className="space-y-2">
            <span
              className={`block w-8 h-0.5 bg-white ${
                mobileMenuIsOpen && "rotate-45 origin-top-left"
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-white ${
                mobileMenuIsOpen && "hidden"
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-white ${
                mobileMenuIsOpen &&
                "-rotate-45 origin-bottom-left translate-y-[0.8rem]"
              }`}
            ></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
