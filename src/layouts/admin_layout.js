import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutButton from "components/buttons/LogoutButton";
import useUserStore from "context/UserStore";
import RouteFactory from "../constants/AdminRouteFactory";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { currentUser } = useUserStore();

  // Generate routes dynamically based on user role
  const userRole = currentUser?.role || "CUSTOMER"; // Default to CUSTOMER if undefined
  const roleRoutes = RouteFactory(userRole);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={275}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="demo-logo-vertical">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            {collapsed ? <span>Store</span> : <span>Book Store</span>}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            navigate(key);
          }}
          items={roleRoutes}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 275 }}>
        <Header
          className="d-flex"
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <LogoutButton />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
