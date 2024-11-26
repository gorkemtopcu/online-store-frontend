import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.jpeg";
import { CustomerRoutePaths } from "constants/route_paths";
import UserMenu from "components/menu/UserMenu";
import useCartStore from "context/CartStore";
import StringConstants from "constants/StringConstants";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [visible, setVisible] = useState(false);
  const { getTotalQuantity } = useCartStore();

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      {" "}
      {/* Outer padding */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 font-medium">
        {/* Logo Container */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-24 mr-4" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p> {StringConstants.HOME}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to={CustomerRoutePaths.COLLECTION}
            className="flex flex-col items-center gap-1"
          >
            <p> {StringConstants.COLLECTION}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to={CustomerRoutePaths.ABOUT}
            className="flex flex-col items-center gap-1"
          >
            <p> {StringConstants.ABOUT}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to={CustomerRoutePaths.CONTACT}
            className="flex flex-col items-center gap-1"
          >
            <p> {StringConstants.CONTACT}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        {/* Icon Links */}
        <div className="flex items-center gap-6">
          <SearchOutlined className="w-5 h-5 cursor-pointer" />
          <div className="group relative">
            <UserMenu />
          </div>
          <Link to={CustomerRoutePaths.CART} className="relative">
            <ShoppingCartOutlined className="w-5 min-w-5" alt="" />
            {getTotalQuantity() > 0 && (
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded text-[8px]">
                {getTotalQuantity()}
              </p>
            )}
          </Link>
          {/* Display menu icon only in small sized screen*/}
          <MenuOutlined
            onClick={() => setVisible(true)}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          />
          {/* todo: Display menu  only in small sized screen*/}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
