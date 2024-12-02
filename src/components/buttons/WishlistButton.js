import React from "react";
import { Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const WishlistButton = ({ isWishlisted, toggleWishlist }) => (
  <Button
    type="text"
    shape="circle"
    icon={
      isWishlisted ? (
        <HeartFilled style={{ color: "red" }} />
      ) : (
        <HeartOutlined />
      )
    }
    onClick={toggleWishlist}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      zIndex: 1,
      backgroundColor: "white",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    }}
  />
);

export default WishlistButton;
