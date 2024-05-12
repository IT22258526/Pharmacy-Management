import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom'; 
import ReactPlayer from 'react-player'; 
const { Header, Content, Footer } = Layout;

const pages = [
  { key: '1', label: 'DashBoard', route: '/register' },
  { key: '2', label: 'Pharmacy Management', route: '/register' },
  { key: '3', label: 'Staff Management', route: '/register' },
  { key: '4', label: 'Laboratory Management', route: '/register' },
  { key: '5', label: 'Appointment Management', route: '/register' },
  { key: '6', label: 'Medical Report ', route: '/register' },
  { key: '7', label: 'Inventory Management', route: '/register' },
  { key: '8', label: 'Feedback Management', route: '/register' },
];

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']} 
          style={{
            flex: 1,
            minWidth: 0,
            background: '#198ab2',
            padding:0,
            borderRadius: borderRadiusLG,
            color: '#0000',
            fontSize: '13px',
            fontWeight: 'bold',
        
           
            
          }}
        >
          {pages.map(({ key, label, route }) => (
            <Menu.Item key={key}>
              <Link to={route}>{label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content
        style={{
            padding: '0 24px',
            backgroundColor: '#001529',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 545, // Adjust the height of the content area
            padding: 12,
            borderRadius: borderRadiusLG,
            backgroundImage: 'url("https://i.pngimg.me/thumb/f/720/c2913511abbe43259110.jpg")',
            backgroundSize: 'cover',
          }}
        >
          
          <ReactPlayer
            url="https://videos.pexels.com/video-files/4491003/4491003-sd_640_360_25fps.mp4" 
            width="100%" 
            height="500px"
            playing 
            muted 
            loop 
          />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >

        <h1>
            IVORY Dental Clinic
        </h1>
      </Footer>
    </Layout>
  );
};

export default Dashboard;
