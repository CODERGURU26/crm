'use client';
import React, { useState } from 'react';
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // ✅ Define menu items using the new format
  const menuItems = [
    {
      key: '/main/dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/main/dashboard">Dashboard</Link>,
    },
    {
      key: '/main/customer',
      icon: <UserOutlined />,
      label: <Link href="/main/customer">Customers</Link>,
    },
    {
      key: '/main/call-logs',
      icon: <PhoneOutlined />,
      label: <Link href="/main/call-logs">Calls & Logs</Link>,
    },
  ];

  return (
    <Layout className="!min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems} // ✅ Use items instead of children
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
          <ToastContainer/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
