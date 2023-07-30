import React, { useContext, useEffect, useState } from "react";
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
import { getAll, readMess } from "api/room";
import moment from "moment";
import { useSocket } from "hooks/useSocket";
import { DataContext } from "context/globalSocket";
import { ROLES } from "types/global";
import { useCallBackApi } from "hooks/useCallback";
const { Sider } = Layout;
const SiderMain = () => {
  const token = theme.useToken();
  const context = useContext(DataContext)
  const { socket } = context
  const { handleJoinRoom, handleEscapeRoom } = useSocket()
  const [openModal, toggleOpenModal] = useToggle(false);
  const [openModalProfile, toggleOpenModalProfile] = useToggle(false);
  const { conservation } = useAppSelector((state) => state.app);
  const { user } = useAppSelector((state) => state.user) as any
  const dispatch = useAppDispatch();
  const isCallback = useCallBackApi("ADD_MEMBERS")
  const [rooms, setRooms] = useState<any>([])

  useEffect(() => {
    if (socket) {
      socket.on("conservation", (newPost: any) => {
        const updatedRooms = rooms.map((room: any) => {
          if (room._id === newPost?.roomId) {
            const newUnread = room.unReadMessage.map((unread: any) => {
              if (unread.user === newPost?.sender._id) {
                return { ...unread, total: 0 }; // Set total to 0 for the current user
              } else {
                return { ...unread, total: unread.total + 1 }; // Increment total for other users
              }
            });


            return {
              ...room, unReadMessage: newUnread, lastMessage: {
                content: newPost?.content,
                createdAt: newPost.createdAt,
                sender: newPost.sender
              }
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

        setRooms(updatedRooms);
      });

    }
    return () => {
      if (socket) {
        socket.off("conservation");
      }
    };
  }, [socket, user, rooms]);

  const totalUnreadMess = (unReadMessage: any) => {
    const totalUread = unReadMessage.find((item: any) => user?._id === item.user)
    if (totalUread) return totalUread?.total
    return 0
  }
  const handleChangeConservation = async (item: any) => {
    dispatch(changeConservation(item))
    localStorage.setItem('conservation', JSON.stringify(item))
    try {
      handleJoinRoom({
        roomId: item?._id,
        userId: user?._id
      })
      const updatedRooms = rooms.map((room: any) => {
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
      setRooms(updatedRooms)

      await readMess({ room: item._id })

    } catch (error) {
      console.log(error);

    }
  }
  const fetchRooms = async () => {
    try {
      const data = await getAll(user?.roles[0]?.code)
      setRooms(data?.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (user) {
      fetchRooms()
      if (localStorage.getItem('conservation') && socket) {
        handleJoinRoom({
          roomId: JSON.parse(localStorage.getItem('conservation') as any)?._id,
          userId: user?._id
        })
      }
      !isMobile &&
        dispatch(changeConservation(JSON.parse(localStorage.getItem('conservation') as any)))
    }
  }, [user, socket, isCallback])

  const items: MenuProps["items"] = rooms.map((item: any, index: number) => ({
    key: item?._id,
    label: (
      <div className="conservation" onClick={() => handleChangeConservation(item)}>
        <div className="content">
          <div>
            <Badge count={totalUnreadMess(item?.unReadMessage)}>
              <Avatar size={60} icon={<UserOutlined />} />
            </Badge>
          </div>

          <div className="right">
            <div className="name">{item?.nameRoom}</div>
            {
              item?.lastMessage &&
              <div className="msg">{item?.lastMessage?.sender?.name}: {item?.lastMessage?.content}</div>
            }
          </div>
        </div>
        <div>
          {
            item?.lastMessage &&
            <div className="time-now">{moment(new Date(item?.lastMessage?.createdAt)).fromNow()}</div>
          }
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
      width={isMobile ? (conservation ? "0" : "100%") : 375}
      style={{
        overflow: "auto",
        height: "100%",
        backgroundColor: token.token.colorBgContainer,
      }}
    >
      <ModalAddGroup
        fetchRooms={fetchRooms}
        isModalOpen={openModal}
        handleCancel={toggleOpenModal} />
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
            <div>
              <Avatar size={48} icon={<UserOutlined />} />
            </div>
          </Dropdown>

          <SearchInput
            placeholder="input search text"
            allowClear
            size="large"
          />
          {
            user?.roles[0]?.code === ROLES.ADMIN &&
            <UsergroupAddOutlined
              onClick={toggleOpenModal}
              style={{ fontSize: "25px", color: "#aaa", cursor: "pointer" }}
            />
          }
        </div>
      </Header>
      <Content>
        {
          rooms?.length > 0 ?

            <MenuStyled mode="inline" defaultSelectedKeys={[JSON.parse(localStorage.getItem("conservation") as any)?._id || ""]} items={items} />
            :
            <div style={{
              textAlign: 'center',
              fontWeight: "500"
            }}>Bạn chưa được thêm vào group 😍😍</div>
        }
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
