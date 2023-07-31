import React, { useState } from "react";
import styled from "styled-components";
import { LinkOutlined, FrownOutlined, SendOutlined } from "@ant-design/icons";
import { Input, Popover, message as toast } from "antd";

import { colors } from "styles/theme";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "store";
import { SendData, sendMess } from "api/chat";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { useSocket } from "hooks/useSocket";
import FileUpload from "./FileUpload";
import { updateMessages } from "store/chat";

type Messagereciept = {
  content: string;
  sender: {
    name: string;
  };
  room: string;
  createdAt: string;
};

interface Props_Type {
  messages: Array<any>;
  setMessages: any;
  scrollToBottom: any;
}
const FooterChat = ({ messages, setMessages, scrollToBottom }: Props_Type) => {
  const { handleSendMessage } = useSocket();
  const { conservation } = useAppSelector((state) => state.app) as any;
  const { user } = useAppSelector((state) => state.user) as any;
  const [contentMessage, setContentMessage] = useState("");
  const { onLoading } = useFnLoading();
  const isLoading = useLoading("SEND");
  const dispatch = useAppDispatch();
  const senMessageChat = async () => {
    if (!conservation) return toast.warning("Bạn chưa có nhóm chát nào");
    onLoading({
      type: "SEND",
      value: true,
    });
    try {
      setContentMessage("");
      const sendData = {
        content: contentMessage,
        room: conservation?._id,
        role: user?.roles[0]?.code,
      } as SendData;
      dispatch(
        updateMessages({
          content: contentMessage,
          sender: {
            name: user?.name,
            _id: user?._id,
          },
          createdAt: new Date(),
        })
      );

      const res = await sendMess(sendData);

      handleSendMessage({
        content: contentMessage,
        createdAt: new Date(),
        roomId: conservation?._id,
        role: user?.roles[0]?.code,
        sender: {
          name: user?.name,
          _id: user?._id,
        },
      });
      scrollToBottom();
    } catch (error) {
      console.log(error);
      dispatch(
        updateMessages({
          content: "Đã có lỗi xảy ra",
          sender: {
            name: user?.name,
            _id: user?._id,
          },
          createdAt: new Date(),
        })
      );
    }
    onLoading({
      type: "SEND",
      value: false,
    });
  };

  return (
    <FooterChatStyled>
      <div className="main">
        <div className="body">
          <FileUpload />
          <Input
            size="large"
            style={{
              height: "50px",
            }}
            value={contentMessage}
            onChange={(e: any) => setContentMessage(e?.target.value)}
            placeholder={`Nhập nội dung để gửi tin nhắn vào ${conservation?.roomName}...`}
          />
          <Popover
            content={
              <EmojiPicker
                onEmojiClick={(emojis: any) =>
                  setContentMessage(contentMessage + emojis?.emoji)
                }
              />
            }
            title="EMOJI"
            trigger={"click"}
          >
            <FrownOutlined
              style={{ fontSize: "30px", color: "#aaa", cursor: "pointer" }}
            />
          </Popover>

          <SendOutlined
            disabled={isLoading}
            onClick={senMessageChat}
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
  height: 70px;
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
      .ant-input {
        &::placeholder {
          font-size: 14px;
          color: #ccc;
        }
      }
    }
  }
`;
