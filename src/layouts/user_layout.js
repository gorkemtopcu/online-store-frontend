import Navbar from "components/navbar/Navbar";

import { Outlet } from "react-router-dom";
import "./user_layout.css";
import React from "react";

const UserLayout = () => {
 


  return (
    <div>
      <Navbar />
      <div
        className="content-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
