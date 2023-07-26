import React from "react";
import styled from "styled-components";
import { FileImageOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
const FooterChat = () => {
  return (
    <FooterChatStyled>
      <div className="main">
        <div className="body">
          {/* <Space.Compact style={{ width: "100%", padding: "10px 0" }}>
            <Input defaultValue="Combine input and button" size="large" />
            <FileImageOutlined
              style={{ fontSize: "30px", color: "#aaa", cursor: "pointer" }}
            />
            <Button type="primary" size="large">
              Submit
            </Button>
          </Space.Compact> */}
        </div>
      </div>
    </FooterChatStyled>
  );
};

export default FooterChat;
const FooterChatStyled = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  background: #ffff;
  padding: 10px;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
   
  }
`;
