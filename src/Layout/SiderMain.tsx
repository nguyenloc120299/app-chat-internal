import React from "react";
import { Avatar, Layout, Menu, MenuProps, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Search from "antd/es/input/Search";
const { Sider } = Layout;
const SiderMain = () => {
  const token = theme.useToken();
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
    label: (
      <div className="conservation">
        <div className="content">
          <Avatar size={60} icon={<UserOutlined />} />
          <div className="right">
            <div className="name">Nguyễn Thành Lộc</div>
            <div className="msg">Nguyễn Thành Lộc: test 123</div>
          </div>
        </div>
        <div>
          <div className="time-now">1 Giờ</div>
        </div>
      </div>
    ),
  }));

  return (
    <SiderMainStyled
      width={450}
      style={{
        overflow: "auto",
        height: "100%",
        backgroundColor: token.token.colorBgContainer,
      }}
    >
      <Header
        style={{
          backgroundColor: token.token.colorBgContainer,
        }}
      >
        <div className="header-main">
          <Search placeholder="input search text" allowClear size="large" />
          <UsergroupAddOutlined
            style={{ fontSize: "25px", color: "#aaa", cursor: "pointer" }}
          />
        </div>
      </Header>
      <Content>
        <MenuStyled mode="inline" defaultSelectedKeys={["4"]} items={items} />
      </Content>
    </SiderMainStyled>
  );
};

export default SiderMain;
const SiderMainStyled = styled(Sider)`
  padding: 20px 0;
  z-index: 999;
  .header-main {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;
const MenuStyled = styled(Menu)`
  .ant-menu-item {
    height: 70px;
    line-height: 25px;
  }
  .conservation {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
    .content {
      display: flex;
      gap: 10px;
      align-items: center;
      .right {
        display: flex;
        flex-direction: column;
        .name {
          font-weight: 600;
          font-size: 16px;
        }
        .msg {
          font-weight: 400;
          font-size: 12px;
          color: #aaa;
        }
      }
    }
    .time-now {
      font-size: 14px;
      color: #aaa;
    }
  }
`;
