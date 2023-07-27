import React from "react";
import { Avatar, Badge, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
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
import { isMobile } from "mobile-device-detect";
import useToggle from "hooks/useToggle";
import ModalAddGroup from "components/Modals/ModalAddGroup";
import ModalProfile from "components/Modals/ModalProfile";
import { useAppDispatch, useAppSelector } from "store";
import { changeConservation } from "store/app";
const { Sider } = Layout;
const SiderMain = () => {
  const token = theme.useToken();
  const [openModal, toggleOpenModal] = useToggle(false);
  const [openModalProfile, toggleOpenModalProfile] = useToggle(false);
  const { conservation } = useAppSelector((state) => state.app);
   const dispatch = useAppDispatch();
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
      <div className="conservation" onClick={() => dispatch(changeConservation(true))}>
        <div className="content">
          <Badge count={9999}>
            <Avatar size={60} icon={<UserOutlined />} />
          </Badge>
          <div className="right">
            <div className="name">Hổ trợ kỉ thuật </div>
            <div className="msg">Nguyễn Thành Lộc: test 123</div>
          </div>
        </div>
        <div>
          <div className="time-now">1 Giờ</div>
        </div>
      </div>
    ),
  }));
  const menu = (
    <Menu>
      <Menu.Item onClick={toggleOpenModalProfile}>Hồ sơ của bạn</Menu.Item>
      <Menu.Item>Đăng xuất</Menu.Item>
    </Menu>
  );
  return (
    <SiderMainStyled
      width={isMobile ? (conservation ? "0" : "100%") : 450}
      style={{
        overflow: "auto",
        height: "100%",
        backgroundColor: token.token.colorBgContainer,
      }}
    >
      <ModalAddGroup isModalOpen={openModal} handleCancel={toggleOpenModal} />
      <ModalProfile
        isModalOpen={openModalProfile}
        handleCancel={toggleOpenModalProfile}
      />
      <Header
        style={{
          backgroundColor: token.token.colorBgContainer,
        }}
      >
        <div className="header-main">
          <Dropdown overlay={menu} className="dropdown">
            <Avatar size={48} icon={<UserOutlined />} />
          </Dropdown>

          <SearchInput
            placeholder="input search text"
            allowClear
            size="large"
          />
          <UsergroupAddOutlined
            onClick={toggleOpenModal}
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
  border-right: 1px solid #cccc;
  .ant-layout-header {
    padding-inline: 20px;
  }
  .header-main {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;
const SearchInput = styled(Search)`
  width: unset;
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
    .ant-badge-count {
      top: 15px;
      right: 5px;
    }
    .content {
      display: flex;
      gap: 18px;
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
