import { Drawer, Layout, theme } from "antd";
import React from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, MenuOutlined } from "@ant-design/icons";
import { isMobile } from "mobile-device-detect";
import { useAppDispatch } from "store";
import { changeConservation } from "store/app";
import useToggle from "hooks/useToggle";
const { Header } = Layout;
const HeaderChat = () => {
  const token = theme.useToken();
  const [openDrawer, toggleDrawer] = useToggle(false);
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

          <div className="info-group">
            <div className="name">SP kỉ thuật</div>
            <div className="member">12 Thành viên</div>
          </div>
        </div>
        {isMobile && (
          <div>
            <MenuOutlined style={{ fontSize: "20px" }} onClick={toggleDrawer}/>
            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={toggleDrawer}
              open={openDrawer}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>
          </div>
        )}
      </div>
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
