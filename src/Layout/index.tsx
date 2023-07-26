import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import SiderMain from "./SiderMain";
import useContentResizer from "hooks/useContentResizer";
import { LayoutStyled } from "styles/theme";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: (
    <div>
      <Avatar size={64} icon={<UserOutlined />} />
    </div>
  ),
}));

const LayoutMain: React.FC = () => {
  const token = theme.useToken();

  return (
    <LayoutStyled hasSider>
      <SiderMain />
      <Layout className="site-layout">
        <Header
          style={{
            backgroundColor: token.token.colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        ></Header>
        <Content style={{ marginBottom: "50px" }}>
          <Outlet />
        </Content>
      </Layout>
      <Sider
        width={350}
        style={{
          overflow: "auto",
          height: "100%",
          backgroundColor: token.token.colorBgContainer,
        }}
      >
        <div>Thông tin nhóm</div>
      </Sider>
    </LayoutStyled>
  );
};

export default LayoutMain;
