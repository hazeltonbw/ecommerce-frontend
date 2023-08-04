import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  logout,
  selectFirstName,
  selectIsLoggedIn,
  clearState,
} from "../features/auth/authSlice";
import type { CartProductT } from "./CartProduct";

import { AiOutlineShoppingCart } from "react-icons/ai";

import imgUrl from "../assets/Shoppo.png";

const Header = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const fname = useAppSelector(selectFirstName);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const itemsInCart = useAppSelector((state) =>
    state.cart.cart != null
      ? state.cart.cart.reduce(
          (acc: number, product: CartProductT) => acc + product.qty,
          0
        )
      : 0
  );

  const closeMobileMenu = () => {
    setMobileMenuIsOpen(false);
  };

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    setIsDisabled(true);
    event.preventDefault();
    dispatch(logout());
    dispatch(clearState());
    setIsDisabled(false);
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-gray-200 p-8 dark:bg-gray-800 dark:text-white">
      <div className="flex ">
        <img src={imgUrl} alt="Shoppo Logo" className="w-16" />
        {isLoggedIn && (
          <h2 className="p-4 text-center capitalize">{`Hello ${fname}!`}</h2>
        )}
      </div>
      <nav className={`flex justify-end px-4`}>
        <ul
          className={
            mobileMenuIsOpen
              ? `absolute top-0 right-0 z-10 flex 
              h-full w-full flex-col items-center justify-center gap-12 rounded-xl 
              border-8 border-sky-700 bg-gray-800 p-16 text-white`
              : `hidden md:flex`
          }
        >
          <li className="w-full">
            <Link
              to={"/"}
              onClick={closeMobileMenu}
              className="
                block rounded-lg p-4 text-center
                hover:border-sky-700 hover:bg-sky-700 hover:text-white hover:shadow-gray-800/50"
            >
              Home
            </Link>
          </li>
          <li className="w-full">
            <Link
              to="/products"
              onClick={closeMobileMenu}
              className="
              block rounded-lg p-4 text-center
                hover:border-sky-700 hover:bg-sky-700 hover:text-white hover:shadow-gray-800/50"
            >
              Products
            </Link>
          </li>
          {isLoggedIn && (
            <li className="w-full ">
              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className="
              flex items-center justify-center
                rounded-lg p-4 text-center hover:border-sky-700 hover:bg-sky-700 hover:text-white hover:shadow-gray-800/50"
              >
                Orders
              </Link>
            </li>
          )}
          {
            // Don't show the register button while the user is logged in
            !isLoggedIn && (
              <li className="w-full">
                <Link
                  to={"/auth/register"}
                  onClick={closeMobileMenu}
                  className="
                block rounded-lg p-4 text-center
                hover:border-sky-700 hover:bg-sky-700 hover:text-white hover:shadow-gray-800/50"
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
                block w-full p-4 text-center
                text-inherit shadow-none hover:border-sky-700 hover:bg-sky-700 hover:text-white hover:shadow-gray-800/50"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/auth/login"}
                onClick={closeMobileMenu}
                className="
        block rounded-lg p-4 text-center
        hover:border-sky-700
        hover:bg-sky-700 hover:text-white hover:shadow-gray-800/50
            "
              >
                Login
              </Link>
            )}
          </li>
          <li className="w-full ">
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              aria-label="Cart"
              className="
              flex items-center justify-center
                rounded-lg p-4 text-center hover:border-sky-700 hover:bg-sky-700 hover:text-white hover:shadow-gray-800/50"
            >
              <div className="relative">
                <span
                  className="absolute -top-[1.4rem] block w-[3ch] rounded-full border-2 border-sky-400 text-sky-400"
                  aria-hidden="true"
                >
                  {itemsInCart}
                </span>
                <AiOutlineShoppingCart size={24} title="View cart" />
              </div>
            </Link>
          </li>
        </ul>

        <div
          className={
            mobileMenuIsOpen
              ? "absolute top-[3.3rem] right-12 z-10 cursor-pointer "
              : "flex cursor-pointer md:hidden"
          }
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        >
          <div className="space-y-2">
            <span
              className={`block h-0.5 w-8 bg-white ${
                mobileMenuIsOpen && "origin-top-left rotate-45"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-8 bg-white ${
                mobileMenuIsOpen && "hidden"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-8 bg-white ${
                mobileMenuIsOpen &&
                "origin-bottom-left translate-y-[0.8rem] -rotate-45"
              }`}
            ></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
