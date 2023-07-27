import React from "react";
import styled from "styled-components";
import {
  FileImageOutlined,
  LinkOutlined,
  FrownOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Input, Popover, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { colors } from "styles/theme";
import useToggle from "hooks/useToggle";
import EmojiPicker from "emoji-picker-react";
const FooterChat = () => {
  const [openEmoji, toggleEmoji] = useToggle(false)
  return (
    <FooterChatStyled>
      <div className="main">
        <div className="body">
          <LinkOutlined
            style={{ fontSize: "30px", color: "#aaa", cursor: "pointer" }}
          />
          <Input
            size="large"
            style={{
              height: "50px",
            }}

            placeholder="Nhập nội dung để gửi tin nhắn vào Hổ trợ kỉ thuật..."
          />
          <Popover content={<EmojiPicker />} title="EMOJI" trigger={"click"}>
            <FrownOutlined
              style={{ fontSize: "30px", color: "#aaa", cursor: "pointer" }}
            />
          </Popover>

          <SendOutlined
            style={{
              fontSize: "30px",
              color: colors.mainColor,
              cursor: "pointer",
            }}
          />
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
  background: #fff;
  padding: 10px;
  .main {
    height: 100%;
    width: 100%;
    margin: auto;
    display: flex;
    .body {
      width: 100%;
      display: flex;
      gap: 5px;
      align-items: center;
      .ant-input{
        &::placeholder{
          font-size: 14px;
          color: #ccc;
        }
      }
    }
  }
`;
