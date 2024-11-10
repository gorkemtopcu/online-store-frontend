import { Layout, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import React from "react";
import logo from "../../assets/images/logo.jpeg";

const { Footer } = Layout;

const HomeFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#f8f8f8",
        textAlign: "center",
        padding: "40px 20px 20px",
      }}
    >
      <div className="max-w-screen-lg mx-auto">
        {/* Company Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start text-gray-700 mb-10">
          <div className="text-center sm:text-left mb-5 sm:mb-0">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-24 mr-4" />
            </div>
            <p>Innovating your wardrobe since 2024.</p>
            <p>All rights reserved &copy; {new Date().getFullYear()}</p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left mb-5 sm:mb-0">
            <h4 className="font-semibold">Quick Links</h4>
            <Space direction="vertical" size="small">
              <a href="/about">About Us</a>
              <a href="/collections">Collections</a>
              <a href="/contact">Contact</a>
              <a href="/faq">FAQs</a>
            </Space>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left mb-5 sm:mb-0">
            <h4 className="font-semibold">Contact Us</h4>
            <p>Email: support@yourcompany.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Fashion Ave, New York, NY</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined
                style={{ fontSize: "20px", color: "#3b5998" }}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined style={{ fontSize: "20px", color: "#1DA1F2" }} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined
                style={{ fontSize: "20px", color: "#C13584" }}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined
                style={{ fontSize: "20px", color: "#0077b5" }}
              />
            </a>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default HomeFooter;
