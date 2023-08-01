import { Avatar, Drawer, Layout, theme } from "antd";
import React from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, MenuOutlined ,UserOutlined} from "@ant-design/icons";
import { isMobile } from "mobile-device-detect";
import { useAppDispatch, useAppSelector } from "store";
import { changeConservation } from "store/app";
import useToggle from "hooks/useToggle";
import SiderInfo from "Layout/SiderInfo";
const { Header } = Layout;
const HeaderChat = () => {
  const token = theme.useToken();
  const [openDrawer, toggleDrawer] = useToggle(false);
  const { conservation } = useAppSelector((state) => state.app) as any
  const dispatch = useAppDispatch();
  return (
    <HeaderChatStyled
      style={{
        backgroundColor: token.token.colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <div>
              <ArrowLeftOutlined
                onClick={() => dispatch(changeConservation(false))}
                style={{
                  marginRight: "20px",
                }}
              />
            </div>
          )}
          <div style={{marginRight:"10px"}}>
            <Avatar size={40} icon={conservation?.avatarRoom ? <img src={conservation?.avatarRoom} alt=""/> : <UserOutlined/>}/>
          </div>
          <div className="info-group">
            <div className="name">{conservation?.nameRoom}</div>
            <div className="member">{conservation?.members?.length} Thành viên</div>
          </div>
        </div>

      </div>
      {isMobile && (
        <div>
          <MenuOutlined style={{ fontSize: "20px" }} onClick={toggleDrawer} />
          {
            openDrawer &&
            <Drawer
              title="Thành viên nhóm"
              placement="right"
              onClose={toggleDrawer}
              open={openDrawer}
              size="large"
              
            >
              <SiderInfo />
            </Drawer>
          }

        </div>
      )}
    </HeaderChatStyled>
  );
};

export default HeaderChat;
const HeaderChatStyled = styled(Header)`
  padding-inline: 10px;
  .info-group {
    line-height: normal;
    .name {
      font-weight: 700;
      font-size: 16;
      color: #000;
    }
    .member {
      font-size: 14px;
      font-weight: 500;
      color: #777;
    }
  }
`;
