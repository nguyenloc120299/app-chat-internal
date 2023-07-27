import React from "react";
import { Avatar, Layout, theme } from "antd";
import styled from "styled-components";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import useToggle from "hooks/useToggle";
import ModalProfile from "components/Modals/ModalProfile";
const { Sider, Header, Content } = Layout;
const SiderInfo = () => {
  const token = theme.useToken();
  const [openModal, toggleOpenModal] = useToggle(false);
  return (
    <SiderInfoStyled
      width={350}
      style={{
        overflow: "auto",
        height: "100%",
        borderLeft: "1px solid #cccc",
        backgroundColor: token.token.colorBgContainer,
      }}
    >
      <ModalProfile
        isModalOpen={openModal}
        handleCancel={toggleOpenModal}
        isShow={true}
      />
      <Header
        style={{
          backgroundColor: token.token.colorBgContainer,
        }}
      >
        <h3>Thành viên nhóm</h3>
      </Header>
      <Content>
        <div className="title">Danh sách thành viên (12)</div>
        <div className="list-member">
          <div className="member">
            <Avatar
              size={50}
              icon={<UserOutlined />}
              onClick={toggleOpenModal}
            />
            <div className="name">Nguyễn Thành Lộc</div>
            <BellOutlined style={{ fontSize: "20px", color: "#666" }} />
          </div>
          <div className="member">
            <Avatar size={50} icon={<UserOutlined />} />
            <div className="name">Nguyễn Thành Lộc</div>
            <BellOutlined style={{ fontSize: "20px", color: "#666" }} />
          </div>
          <div className="member">
            <Avatar size={50} icon={<UserOutlined />} />
            <div className="name">Nguyễn Thành Lộc</div>
            <BellOutlined style={{ fontSize: "20px", color: "#666" }} />
          </div>
        </div>
      </Content>
    </SiderInfoStyled>
  );
};

export default SiderInfo;
const SiderInfoStyled = styled(Sider)`
  .ant-layout-header {
    border-bottom: 1px solid #cccc;
    h3 {
      text-align: center;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .ant-layout-content {
    padding: 30px 20px;
    .title {
      text-align: left;
      font-size: 18px;
      font-weight: 500;
    }
    .list-member {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 10px 0;
      .member {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        .name {
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
`;
