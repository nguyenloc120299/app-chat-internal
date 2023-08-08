import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Spin,
  theme,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Search from "antd/es/input/Search";
import { isMobile } from "mobile-device-detect";
import useToggle from "hooks/useToggle";
import ModalAddGroup from "components/Modals/ModalAddGroup";
import ModalProfile from "components/Modals/ModalProfile";
import { useAppDispatch, useAppSelector } from "store";
import { changeConservation } from "store/app";
import { getAll, readMess } from "api/room";
import moment from "moment";
import { useSocket } from "hooks/useSocket";
import { DataContext } from "context/globalSocket";
import { ROLES } from "types/global";
import { useCallBackApi } from "hooks/useCallback";
import { logout } from "api/user";
import { useNavigate } from "react-router-dom";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { resetMessUnread, setMessages } from "store/chat";
import { LoadingOutlined } from "@ant-design/icons";
import { setRooms } from "store/room";
const { Sider } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const SiderMain = () => {
  const token = theme.useToken();
  const context = useContext(DataContext);
  const { socket } = context;
  const { handleJoinRoom, handleEscapeRoom } = useSocket();
  const [openModal, toggleOpenModal] = useToggle(false);
  const [openModalProfile, toggleOpenModalProfile] = useToggle(false);
  const { conservation } = useAppSelector((state) => state.app) as any;
  const { user } = useAppSelector((state) => state.user) as any;
  const { rooms } = useAppSelector((state) => state.room) as any;
  const dispatch = useAppDispatch();
  const isCallback = useCallBackApi("ADD_MEMBERS");
  const isLoadmore = useLoading("LOAD_MORE");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { onLoading } = useFnLoading();
  // const [rooms, setRooms] = useState<{ rooms: Array<any>, total: number }>({
  //   rooms: [],
  //   total: 0
  // });
  const navigate = useNavigate();
  const refDisplay = useRef<any>();

  useEffect(() => {
    if (socket)
      socket.on("removeRoomClient", (data: { roomId: string }) => {
        if (conservation?._id !== data.roomId)
          localStorage.removeItem("conservation");
        const newRooms = rooms?.rooms.filter((r: any) => r?._id != data.roomId);
        dispatch(
          setRooms({
            ...rooms,
            rooms: newRooms,
          })
        );
      });
  }, [socket, rooms, conservation]);
  //socket

  useEffect(() => {
    if (socket && user)
      socket.on("addRoomClient", (room: any) => {
        room?.members.forEach((r: any) => {
          if (r?._id === user?._id)
            dispatch(
              setRooms({
                ...rooms,
                rooms: [room, ...rooms.rooms],
              })
            );
        });
      });
  }, [socket, user, rooms]);

  useEffect(() => {
    if (socket) {
      socket.on("conservation", (newPost: any) => {
        const updatedRooms = rooms.rooms.map((room: any) => {
          if (room._id === newPost?.roomId) {
            const newUnread = room.unReadMessage.map((unread: any) => {
              if (unread.user === newPost?.sender._id) {
                return { ...unread, total: 0 }; // Set total to 0 for the current user
              } else {
                return { ...unread, total: unread.total + 1 }; // Increment total for other users
              }
            });

            return {
              ...room,
              unReadMessage: newUnread,
              lastMessage: {
                content: newPost?.content,
                createdAt: newPost.createdAt,
                sender: newPost.sender,
              },
            };
          }
          return room;
        });

        // Sort the updated rooms based on whether the newPost roomId matches
        updatedRooms.sort((a: any, b: any) => {
          if (a._id === newPost?.roomId) return -1; // Bring the matching room to the top
          if (b._id === newPost?.roomId) return 1;
          return 0;
        });

        dispatch(
          setRooms({
            ...rooms,
            rooms: updatedRooms,
          })
        );
      });
    }
    return () => {
      if (socket) {
        socket.off("conservation");
      }
    };
  }, [socket, user, rooms]);

  const totalUnreadMess = (unReadMessage: any) => {
    const totalUread = unReadMessage.find(
      (item: any) => user?._id === item.user
    );
    if (totalUread) return totalUread?.total;
    return 0;
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(changeConservation(false));
      dispatch(setMessages([]));
      dispatch(
        setRooms({
          rooms: [],
          total: 0,
        })
      );
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeConservation = async (item: any) => {
    dispatch(changeConservation(item));
    dispatch(resetMessUnread());
    localStorage.setItem("conservation", JSON.stringify(item));
    try {
      handleJoinRoom({
        roomId: item?._id,
        userId: user?._id,
      });
      const updatedRooms = rooms.rooms.map((room: any) => {
        if (room._id === item?._id) {
          const newUnread = room.unReadMessage.map((unread: any) => {
            if (unread.user === user?._id) {
              return { ...unread, total: 0 };
            }
            return unread;
          });
          return { ...room, unReadMessage: newUnread };
        }
        return room;
      });
      dispatch(
        setRooms({
          ...rooms,
          rooms: updatedRooms,
        })
      );

      await readMess({ room: item._id });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRooms = useCallback(
    async (page: number, role: ROLES, search?: string) => {
      try {
        const res = await getAll(role, page, search);
        dispatch(
          setRooms({
            total: res?.data?.total,
            rooms: [...rooms.rooms, ...res?.data?.rooms],
          })
        );
      } catch (error) {
        console.log(error);
      }
      onLoading({
        type: "FETCH",
        value: false,
      });
      onLoading({
        type: "LOAD_MORE",
        value: false,
      });
    },
    []
  );

  useEffect(() => {
    const container = refDisplay.current;
    let isScrollingUp = false;

    const handleTouchMove = (event: TouchEvent) => {
      if (rooms?.total === rooms.rooms.length) return;
      const containerHeight = container.clientHeight;
      const maxScrollHeight = container.scrollHeight - containerHeight;
      const currentScrollPosition = container.scrollTop;
      if (
        event.touches[0].clientY > containerHeight / 2 &&
        currentScrollPosition >= maxScrollHeight - 10
      ) {
        onLoading({
          type: "LOAD_MORE",
          value: true,
        });
        setPage(page + 1);
      }
      isScrollingUp = event.touches[0].clientY < containerHeight / 2;
    };

    const handleWheel = (event: any) => {
      if (rooms?.total === rooms.rooms.length) return;
      const containerHeight = container.clientHeight;
      const maxScrollHeight = container.scrollHeight - containerHeight;
      const currentScrollPosition = container.scrollTop;

      if (event.deltaY > 0 && currentScrollPosition >= maxScrollHeight - 10) {
        onLoading({
          type: "LOAD_MORE",
          value: true,
        });
        setPage(page + 1);
      }
      isScrollingUp = event.deltaY < 0;
    };

    container.addEventListener("wheel", handleWheel);
    container.addEventListener("touchstart", handleTouchMove);
    if (isLoadmore) {
      setTimeout(() => {
        onLoading({
          type: "LOAD_MORE",
          value: false,
        });
      }, 5000);
    }
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchMove);
    };
  }, [isLoadmore, rooms]);

  useEffect(() => {
    if (user) {
      fetchRooms(page, user?.roles[0]?.code);
      if (page > 1) return;
      if (localStorage.getItem("conservation") && socket) {
        handleJoinRoom({
          roomId: JSON.parse(localStorage.getItem("conservation") as any)?._id,
          userId: user?._id,
        });
      }
      !isMobile &&
        dispatch(
          changeConservation(
            JSON.parse(localStorage.getItem("conservation") as any)
          )
        );
    }
  }, [user, socket, isCallback, page]);

  const items: MenuProps["items"] = rooms.rooms.map(
    (item: any, index: number) => ({
      key: item?._id,
      label: (
        <div
          className="conservation"
          onClick={() => handleChangeConservation(item)}
        >
          <div className="content">
            <div>
              <Badge count={totalUnreadMess(item?.unReadMessage)}>
                <Avatar
                  size={60}
                  icon={
                    item?.avatarRoom ? (
                      <img src={item?.avatarRoom} />
                    ) : (
                      <UserOutlined />
                    )
                  }
                />
              </Badge>
            </div>

            <div className="right">
              <div>
                <div className="name-room">
                  <div className="name">{item?.nameRoom}</div>
                  {item?.lastMessage && (
                    <div className="time-now">
                      {moment(new Date(item?.lastMessage?.createdAt)).fromNow()}
                    </div>
                  )}
                </div>
              </div>

              {item?.lastMessage && (
                <div className="msg">
                  {item?.lastMessage?.sender?.roles[0]?.code}:{" "}
                  {!item?.lastMessage?.content
                    ? "Đã gửi 1 file"
                    : item?.lastMessage?.content}
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    })
  );

  const menu = (
    <Menu>
      <Menu.Item onClick={toggleOpenModalProfile}>Hồ sơ của bạn</Menu.Item>
      <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <SiderMainStyled
      width={isMobile ? (conservation ? "0" : "100%") : 375}
      style={{
        height: "100vh",
        backgroundColor: token.token.colorBgContainer,
      }}
    >
      <ModalAddGroup
        fetchRooms={fetchRooms}
        isModalOpen={openModal}
        handleCancel={toggleOpenModal}
        onupdateRoom={(room: any) =>
          dispatch(
            setRooms({
              ...rooms,
              rooms: [room, ...rooms.rooms],
            })
          )
        }
      />
      <ModalProfile
        isModalOpen={openModalProfile}
        handleCancel={toggleOpenModalProfile}
        user={user}
      />
      <Header
        style={{
          backgroundColor: token.token.colorBgContainer,
        }}
      >
        <div className="header-main">
          <Dropdown overlay={menu} className="dropdown">
            <div>
              <Avatar
                size={48}
                icon={
                  user?.profilePicUrl ? (
                    <img src={user?.profilePicUrl} alt="avt" />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            </div>
          </Dropdown>

          <SearchInput
            placeholder="Tìm kiếm nhóm"
            allowClear
            value={search}
            onChange={(e: any) => setSearch(e?.target?.value)}
            onSearch={() => fetchRooms(1, user?.roles[0]?.code, search)}
            size="large"
          />
          {user?.roles[0]?.code === ROLES.ADMIN && (
            <UsergroupAddOutlined
              onClick={toggleOpenModal}
              style={{ fontSize: "25px", color: "#aaa", cursor: "pointer" }}
            />
          )}
        </div>
      </Header>
      <ContentSider ref={refDisplay}>
        {rooms.rooms?.length > 0 ? (
          <MenuStyled
            mode="inline"
            defaultSelectedKeys={[
              JSON.parse(localStorage.getItem("conservation") as any)?._id ||
                "",
            ]}
            items={items}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Bạn chưa được thêm vào group 😍😍
          </div>
        )}
        {isLoadmore && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Spin indicator={antIcon} />
          </div>
        )}
      </ContentSider>
    </SiderMainStyled>
  );
};

export default SiderMain;
const ContentSider = styled(Content)`
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
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
    /* display: flex;
   justify-content: space-between;
    gap: 10px;
    align-items: flex-start; */
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
        width: 100%;
        .name {
          font-weight: 600;
          font-size: 16px;
          max-width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .name-room {
          display: flex;
          justify-content: space-between;
        }
        .msg {
          font-weight: 400;
          font-size: 12px;
          color: #aaa;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 250px;
          width: 100%;
        }
      }
    }
    .time-now {
      font-size: 14px;
      color: #aaa;
    }
  }
`;
