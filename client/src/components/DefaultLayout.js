import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  MediumOutlined,
  ShoppingCartOutlined,
  SnippetsOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';

import "../styles/DefaultLayout.css";


import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const App = ({ children }) => {
  const navigate = useNavigate(); 

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '960px', background: 'rgb(125, 210, 240)' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#023E8A', borderRadius: '15px', paddingTop: '10px', height: '950px' }}>
        <div className="demo-logo-vertical"  >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkv6dg5oDHHjkj_uxHOeYf4jxlEWriGmryV9fmayjbw&s" alt="Pharmacy Logo" style={{ width: '130px', height: '130px', borderRadius: '100px', marginLeft: '36px' }} />

          <h1 className="text-center text-light font-wight-bold mt-4">
            IVORY Pharmacy
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          style={{ padding: '16px 0', background: '#023E8A' }}
        >
          <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="/" icon={<UserOutlined  />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<MediumOutlined />}>
            <Link to="/items">Medicines</Link>
          </Menu.Item>
          <Menu.Item key="purchases" icon={<ShoppingCartOutlined />}>
            <Link to="/purchases">Purchases</Link>
          </Menu.Item>
          <Menu.Item key="bills" icon={<SnippetsOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem('auth');
              navigate('/dashboard'); 
            }}
          >
            Logout
          </Menu.Item>

        </Menu>

      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '20px',
              width: 64,
              height: 64,

            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 320,
            background: 'rgb(125, 210, 240)',
            borderRadius: borderRadiusLG,
            backgroundImage: 'url("https://img.freepik.com/free-vector/dentist-medical-background-with-3d-tooth-design_1017-26095.jpg")',
            backgroundSize: 'cover',

          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
