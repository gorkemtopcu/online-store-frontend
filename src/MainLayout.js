import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import Routes from './constants/Routes';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null} collapsible collapsed={collapsed}
                width={275}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="demo-logo-vertical">
                    {collapsed ? (
                        <h2 className="text-white fs-5 text-center py-3 mb-0">
                            <span className="lg-logo"> Store </span>
                        </h2>
                    ) : (
                        <h2 className="text-white fs-5 text-center py-3 mb-0">
                            <span className="lg-logo"> Clothing Store </span>
                        </h2>
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        navigate(key);
                        console.log(key);
                    }}
                    items={Routes}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
            <Header className="d-flex justify-content-between ps-2 pe-5" style={{ padding: 0, background: colorBgContainer }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    }}
                />
                <div className="header-right" style={{ display: 'flex', alignItems: 'center', maxHeight: '60px', padding: '0', borderRadius: '0' }}>
                </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        minHeight: 280, 
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout >
    );
};

export default MainLayout;
