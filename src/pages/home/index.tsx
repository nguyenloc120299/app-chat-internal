import { getMessages } from "api/chat";
import FooterChat from "components/FooterChat";
import { isMobile } from "mobile-device-detect";
import React, { TouchEvent, useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import styled from "styled-components";
import { colors } from "styles/theme";
import moment from "moment";
import "moment/locale/vi";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { DataContext } from "context/globalSocket";
import { MESSAGE } from "types/joinRoom";
import { useSocket } from "hooks/useSocket";
import {
  loadMoreMessUpdate,
  resetMessages,
  resetMessUnread,
  setMessages,
  setMessagesUnread,
  updateMessages,
} from "store/chat";
import Messages from "components/messages/Messages";
import LightBoxFile from "components/Modals/LightBoxFile";
import useToggle from "hooks/useToggle";
import { scrollToBottom, scrollToElement } from "helpers/scrollBottom";
import nomess from 'assets/images/no-message.png'
moment.locale("vi");
const Home = () => {
  const { handleLeaveRoom } = useSocket();
  const context = useContext(DataContext);
  const { messages, messUnread } = useAppSelector((state) => state.chat) as any;
  const dispatch = useAppDispatch();
  const { socket } = context;
  const refDisplay = useRef<any>();
  const [lightBox, toggleLightBox] = useToggle(false);
  const [fileSelectm, setFileSelect] = useState<any>(null);
  const { conservation } = useAppSelector((state) => state.app) as any;
  const { user } = useAppSelector((state) => state.user) as any;
  const { onLoading } = useFnLoading();
  const isLoading = useLoading("MESSAGES");
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [totalMessage, setTotalMessages] = useState(0);

  ///listen event socket
  useEffect(() => {
    if (socket) {
      socket.on("messageClient", (newPost: MESSAGE) => {
        if (newPost && user && newPost.sender._id !== user?._id) {
          //dispatch(setMessagesUnread(newPost));
          dispatch(updateMessages(newPost));
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("messageClient");
      }
    };
  }, [socket, user]);

  ///leave room socket
  useEffect(() => {
    if (socket)
      window.addEventListener("beforeunload", () =>
        handleLeaveRoom({
          roomId: conservation?._id,
          userId: user?._id,
        })
      );
    return () => {
      if (socket)
        window.addEventListener("beforeunload", () =>
          handleLeaveRoom({
            roomId: conservation?._id,
            userId: user?._id,
          })
        );
    };
  }, [socket, conservation, user]);

  const handleLightBox = (item: any) => {
    setFileSelect(item);
    toggleLightBox();
  };

  useEffect(() => {
    const container = refDisplay.current;
    let isScrollingUp = false;

    const handleTouchMove = (event: TouchEvent) => {
      if (isLoading || totalMessage === messages.length) return;
      const startY = event.touches[0].clientY;
      container.addEventListener("touchmove", (event: TouchEvent) => {
        const currentY = event.touches[0].clientY;
        if (currentY < startY && !isScrollingUp) {
          isScrollingUp = true;
          setPage((prevPage) => prevPage + 1);
        }
      });
    };

    const handleWheel = (event: any) => {
      if (isLoading || totalMessage === messages.length) return;
      if (event.wheelDelta > 0 && !isScrollingUp) {
        isScrollingUp = true;
        setPage((prevPage) => prevPage + 1);
      }
    };

    container.addEventListener("wheel", handleWheel);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isLoading, messages, setPage]);

  useEffect(() => {
    if (page > 1 && messages?.length < totalMessage)
      loadMoreMessage(conservation, page);
  }, [page]);

  const handleCloseLightBox = () => {
    setFileSelect(null);
    toggleLightBox();
  };

  const fetchAllMessages = async (conservation: any) => {
    dispatch(resetMessages([]));

    try {
      const res = await getMessages(conservation._id, `1`, "100");
      if (res && res?.data) {
        dispatch(setMessages(res?.data?.messages));
        setPage(1);
        setTotalMessages(res?.data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreMessage = async (conservation: any, page: number) => {
    try {
      onLoading({ type: "MESSAGES", value: true });
      const res = await getMessages(conservation._id, `${page}`, "100");
      if (res && res?.data) {
        dispatch(loadMoreMessUpdate(res?.data?.messages));
      }
    } catch (error) {
      console.log(error);
    }
    onLoading({ type: "MESSAGES", value: false });
  };

  const fetchAllCondition = async () => {
    if (localStorage.getItem("conservation"))
      return await fetchAllMessages(
        JSON.parse(localStorage.getItem("conservation") as any)
      );
    if (conservation) return await fetchAllMessages(conservation);
  };

  useEffect(() => {
    fetchAllCondition();
  }, [conservation?._id]);

  useEffect(() => {
    if (page === 1) scrollToBottom(refDisplay);
  }, [conservation, messages, page]);

  return (
    <HomeStyled>
      {lightBox && (
        <LightBoxFile
          fileSelect={fileSelectm}
          lightBox={lightBox}
          handleCloseLightBox={handleCloseLightBox}
        />
      )}
      <div className="content" ref={refDisplay} id="scrollableDiv">
        {user && messages?.length ? (
          messages?.map((item: any) => (
            <Messages
              message={item}
              handleLightBox={handleLightBox}
              messUnread={messUnread?.[0]}
            />
          ))
        ) : (
          <div className="text-intro">
            <img src={nomess} alt="" style={{
              width: "100px",
              height: "100px"
            }} />
          </div>
        )}

        {/* {messUnread?.length > 0 && (
          <div className="total-unread">
            <a href={`#${messUnread?.[0]?._id}`}>
              {messUnread?.length} tin nhắn chưa đọc
            </a>
          </div>
        )} */}
      </div>
      <FooterChat
        messages={messages}
        setMessages={setMessages}
        scrollToBottom={scrollToBottom}
        setPage={setPage}
      />
    </HomeStyled>
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
    .mess-unread {
      text-align: center;
      font-weight: 500;
      padding: 15px;
    }
    .total-unread {
      position: sticky;
      bottom: 5px;
      left: 0;
      text-align: left;

      a {
        font-weight: 500;
      }
    }
    .file-content {
      margin-top: 10px;
      cursor: pointer;
      img,
      video {
        max-width: 350px;
        object-fit: cover;
        border-radius: 10px;
        @media (max-width: 678px) {
          width: 100%;
        }
      }
      .video-render {
        position: relative;
        .icon-muted {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .text-intro {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 500;
      text-align: center;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.1);
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
      margin-bottom: 20px;
      margin-right: ${isMobile ? "10px" : "150px"};

      .main-msg {
        display: flex;
        gap: 5px;
        .content-msg {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 10px;
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
      margin-bottom: 10px;
      margin-left: ${isMobile ? "10px" : "150px"};

      .main-msg {
        display: flex;
        gap: 5px;
        .content-msg {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 10px;
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
