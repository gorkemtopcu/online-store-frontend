import React from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MainImage = ({ imageURL, name, onNavigate }) => (
  <div style={{ position: "relative", textAlign: "center", width: "100%" }}>
    <Button
      type="text"
      shape="circle"
      icon={<LeftOutlined />}
      onClick={() => onNavigate("left")}
      style={{
        position: "absolute",
        top: "50%",
        left: "8px",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
    />
    <img
      alt={name}
      src={imageURL}
      style={{
        width: "100%",
        borderRadius: "8px",
        objectFit: "contain",
      }}
    />
    <Button
      type="text"
      shape="circle"
      icon={<RightOutlined />}
      onClick={() => onNavigate("right")}
      style={{
        position: "absolute",
        top: "50%",
        right: "8px",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
    />
  </div>
);

export default MainImage;
