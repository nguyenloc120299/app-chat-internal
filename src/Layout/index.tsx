import React from "react";

import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import SiderMain from "./SiderMain";
import { LayoutStyled } from "styles/theme";
import HeaderChat from "components/HeaderChat";
import SiderInfo from "./SiderInfo";
import { isMobile } from "mobile-device-detect";
import { useAppSelector } from "store";
import MainContent from "components/views/MainContent";

const { Header, Content, Footer, Sider } = Layout;

const LayoutMain: React.FC = () => {
  const token = theme.useToken();
  const { conservation } = useAppSelector((state) => state.app);
  return (
    <LayoutStyled hasSider>
      <SiderMain />
      {conservation ? (
        <Layout className="site-layout">
          <HeaderChat />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      ) : (
        <MainContent/>
      )}
      {!isMobile && !!conservation && <SiderInfo />}
    </LayoutStyled>
  );
};

export default LayoutMain;
