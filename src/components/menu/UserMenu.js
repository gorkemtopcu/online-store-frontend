import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthenticationModal from "components/modals/AuthenticationModal";
import useUserStore from "context/UserStore";
import { useState } from "react";
import React from "react";
import StringConstants from "constants/StringConstants";
import { CustomerRoutePaths } from "constants/route_paths";

const UserMenu = () => {
  const { currentUser, logout } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="group relative">
      <UserOutlined className="w-5 h-5 cursor-pointer" />
      <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
          {currentUser ? (
            <>
              <p className="cursor-pointer hover:text-black"> 
                <Link to= {CustomerRoutePaths.ORDERS}> {StringConstants.ORDERS} </Link>
              </p>
              <p className="cursor-pointer hover:text-black">
                <Link to= {CustomerRoutePaths.WISHLIST}> {StringConstants.WISHLIST} </Link>
              </p>
              <p className="cursor-pointer hover:text-black" onClick={logout}>
              {StringConstants.LOGOUT}
              </p>
            </>
          ) : (
            <p className="cursor-pointer hover:text-black" onClick={openModal}>
              {StringConstants.SIGN_IN}
            </p>
          )}
        </div>
      </div>

      <AuthenticationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default UserMenu;
