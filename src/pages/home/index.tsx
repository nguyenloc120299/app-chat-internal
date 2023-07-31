import { Avatar, Layout, Spin, Tag } from "antd";
import { getMessages } from "api/chat";
import FooterChat from "components/FooterChat";
import useContentResizer from "hooks/useContentResizer";
import { isMobile } from "mobile-device-detect";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAppSelector } from "store";
import styled from "styled-components";
import { colors } from "styles/theme";
import moment from 'moment'
import 'moment/locale/vi';  // without this line it didn't work
import { useFnLoading, useLoading } from "hooks/useLoading";

import { DataContext } from "context/globalSocket";
import { MESSAGE } from "types/joinRoom";
import { useSocket } from "hooks/useSocket";
import TagsRole from "components/views/TagsRole";
moment.locale('vi')

const Home = () => {
  const { handleLeaveRoom } = useSocket()
  const context = useContext(DataContext)
  const { socket } = context
  const refDisplay = useRef<any>();
  const [messages, setMessages] = useState<any>()
  const { conservation } = useAppSelector((state) => state.app) as any
  const { user } = useAppSelector((state) => state.user) as any
  const { onLoading } = useFnLoading()
  const isLoading = useLoading("MESSAGES")

  useEffect(() => {
    if (socket) {
      socket.on("messageClient", (newPost: MESSAGE) => {
        if (newPost)
          setMessages((prevMessages: any) => [...prevMessages, newPost]);
      });
    }
    return () => {
      if (socket) {
        socket.off("messageClient");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket)
      window.addEventListener("beforeunload", () => handleLeaveRoom({
        roomId: conservation?._id,
        userId: user?._id
      }));
    return () => {
      if (socket)
        window.addEventListener("beforeunload", () => handleLeaveRoom({
          roomId: conservation?._id,
          userId: user?._id
        }));
    }
  }, [socket, conservation, user])

  const fetchAllMessages = async (conservation: any) => {
    setMessages([])
    try {
      onLoading({ type: "MESSAGES", value: true })
      const res = await getMessages(conservation._id, "1", "50")
      if (res && res?.data) setMessages(res?.data)
    } catch (error) {
      console.log(error);
    }
    onLoading({ type: "MESSAGES", value: false })
  }
  const fectAllCondition = async () => {
    if (localStorage.getItem('conservation'))
      return await fetchAllMessages(JSON.parse(localStorage.getItem('conservation') as any))
    if (conservation)
      return await fetchAllMessages(conservation)
  }
  useEffect(() => {
    fectAllCondition()
  }, [conservation])
  const scrollToBottom = () => {
    const chatDisplay = refDisplay?.current;
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [conservation, messages]);

  const getMessage = (message?: any,user?: any) => {
    if (message?.sender?._id === user?._id) return (
      <div className="message-sender">
        <div className="main-msg">
          <div className="content-msg">
            <div className="auth">
              {message?.sender?.name}
              <TagsRole role={message?.role} />
            </div>
            <div>   {message?.content}</div>
            <div className="time">{moment(new Date(message?.createdAt)).fromNow()}</div>
          </div>
          <div>
            <Avatar size={40} />
          </div>
        </div>
      </div>
    )
    else
      return (
        <div className="message-recipient">
          <div className="main-msg">
            <div>
              <Avatar size={40} />
            </div>
            <div className="content-msg">
              <div className="auth">
                {message?.sender?.name}
                <TagsRole role={message?.role} />
              </div>
              <div>
                {message?.content}
              </div>
              <div className="time">{moment(new Date(message?.createdAt)).fromNow()}</div>
            </div>
          </div>
        </div>
      )
  }
  return (
    <HomeStyled>
      <div className="content" ref={refDisplay}>
        {
        user &&  messages?.length ? messages?.map((item: any) => (
            getMessage(item,user)
          ))
            :
            <div className="text-intro">
              Gửi tin nhắn để có thể trò chuyện 🤭🤭
            </div>
        }
      </div>
      <FooterChat
        messages={messages}
        setMessages={setMessages}
        scrollToBottom={scrollToBottom}
      />


    </HomeStyled >
  );
};

export default Home;
const HomeStyled: any = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  
  .content {
    flex: 1;
    background: #cccc;
    padding: 20px;
    overflow-y: scroll;
    position: relative;
    .text-intro{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-weight: 500;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
    .message-recipient {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 4px;
      margin-bottom: 15px;
      margin-right: ${isMobile ? "10px" : "150px"};

      .main-msg {
        display: flex;
        gap: 5px;
        .content-msg {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 15px;
          background: #f0ebeb;
          border-radius: 8px;
          white-space: pre-line;
          .auth {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 7px;
          }
          .time {
            text-align: right;
            width: 100%;
            margin-top: 10px;
            font-size: 10px;
            color: #aaa;
          }
        }
      }
    }
    .message-sender {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 0px;
      gap: 10px;
      margin-bottom: 5px;
      margin-left: ${isMobile ? "10px" : "150px"};
    
      .main-msg {
        display: flex;
        gap: 5px;
        .content-msg {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 15px;
          background: ${colors.mainColor};
          color: #f0ebeb;
          border-radius: 8px;
          white-space: pre-line;
          .auth {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 7px;
          }
          .time {
            text-align: right;
            width: 100%;
            margin-top: 10px;
            font-size: 10px;
            color: #fff;
          }
        }
      }
    }
  }
`;
