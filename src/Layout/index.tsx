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
import HeaderChat from "components/HeaderChat";
import SiderInfo from "./SiderInfo";
import { isMobile } from "mobile-device-detect";

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
        <HeaderChat />
        <Content>
          <Outlet />
        </Content>
      </Layout>
      {!isMobile && <SiderInfo />}
    </LayoutStyled>
  );
};

export default LayoutMain;
