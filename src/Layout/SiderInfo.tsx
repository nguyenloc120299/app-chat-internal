import React, { useCallback, useState } from "react";
import { Avatar, Button, Layout, Modal, Tag, message, theme } from "antd";
import styled from "styled-components";
import { UserOutlined, BellOutlined, UserAddOutlined } from "@ant-design/icons";
import useToggle from "hooks/useToggle";
import ModalProfile from "components/Modals/ModalProfile";
import { useAppDispatch, useAppSelector } from "store";
import ListUsers from "components/views/ListUsers";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { addMembers } from "api/room";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { useCallBackApi, useFnCallbackApi } from "hooks/useCallback";
import { isMobile } from "mobile-device-detect";
import { ROLES } from "types/global";
import { pushNotification } from "api/chat";
import { resetMessUnread, updateMessages } from "store/chat";
import { useSocket } from "hooks/useSocket";
const { Sider, Header, Content } = Layout;
const SiderInfo = () => {
  const token = theme.useToken();
  const [member, setMember] = useState<any>(null);
  const { user } = useAppSelector((state) => state.user) as any;
  const [openModal, toggleOpenModal] = useToggle(false);
  const { conservation } = useAppSelector((state) => state.app) as any;
  const [openModalAddUser, toggleopenModalAddUser] = useToggle(false);
  const [members, setMembers] = useState<any>([]);
  const { onLoading } = useFnLoading();
  const { onCallback } = useFnCallbackApi();
  const isLoading = useLoading("ADD_MEMBERS");
  const isCallback = useCallBackApi("ADD_MEMBERS");
  const dispatch = useAppDispatch()
  const { handleSendMessage } = useSocket()
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setMembers(checkedValues);
  };

  const handleAddMembers = async () => {
    try {
      if (!members.length) return message.warning("Vui lòng thêm thành viên");
      onLoading({
        type: "ADD_MEMBERS",
        value: true,
      });
      await addMembers({
        members,
        roomId: conservation?._id,
      });
      onCallback({
        type: "ADD_MEMBERS",
        value: !isCallback,
      });
      message.success("Đã thêm thành viên mới");
      toggleopenModalAddUser();
    } catch (error) {
      console.log(error);
    }
    onLoading({
      type: "ADD_MEMBERS",
      value: false,
    });
  };
  const pushNotifications = async (member: any) => {
    try {
      dispatch(resetMessUnread())
      dispatch(
        updateMessages({
          content: "@" + member?.name,
          sender: user,
          createdAt: new Date(),
          role: user?.roles[0]?.code,
        })
      );
      const res = await pushNotification({
        bodyNotification: `${conservation?.nameRoom}: @${user?.name} đã nhắc đến bạn`,
        titleNotification: "Union Digital Chat ",
        userId: member?._id,
        role: user?.roles[0]?.code,
        room: conservation?._id
      });

      handleSendMessage({
        content: "@" + member?.name,
        createdAt: new Date(),
        roomId: conservation?._id,
        role: user?.roles[0]?.code,
        sender: user,
        _id: res?.data?._id
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SiderInfoStyled
      width={350}
      style={{
        overflow: "auto",
        height: "100%",
        borderLeft: isMobile ? "none" : "1px solid #cccc",
        backgroundColor: token.token.colorBgContainer,
      }}
    >
      <ModalProfile
        isModalOpen={openModal}
        handleCancel={toggleOpenModal}
        isShow={true}
        user={member}
      />
      {!isMobile && (
        <Header
          style={{
            backgroundColor: token.token.colorBgContainer,
          }}
        >
          <h3>Thành viên nhóm</h3>
        </Header>
      )}
      <Content>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div className="title">
            Danh sách thành viên ({conservation?.members?.length})
          </div>
          {user?.roles && user?.roles[0]?.code === ROLES.ADMIN && (
            <UserAddOutlined
              onClick={() => {
                toggleopenModalAddUser();
              }}
              style={{
                color: "#aaa",
                fontSize: "20px",
                cursor: "pointer",
              }}
            />
          )}
        </div>
        <div className="list-member">
          {conservation?.members?.map((item: any, index: number) => (
            <div className="member" key={index}>
              <Avatar
                size={50}
                icon={
                  item?.profilePicUrl ? (
                    <img src={item?.profilePicUrl} alt="avt" />
                  ) : (
                    <UserOutlined />
                  )
                }
                onClick={() => {
                  if (user?.roles[0]?.code !== ROLES.ADMIN) return;
                  setMember(item);
                  toggleOpenModal();
                }}
              />
              <div className="name">{item?.name}</div>
              <BellOutlined
                style={{ fontSize: "20px", color: "#666" }}
                onClick={() => pushNotifications(item)}
              />
            </div>
          ))}
        </div>
      </Content>
      <Modal
        title="Thêm thành viên"
        open={openModalAddUser}
        onCancel={toggleopenModalAddUser}
        footer={
          <div>
            <Button
              onClick={() => {
                toggleopenModalAddUser();
              }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              loading={isLoading}
              disabled={isLoading}
              onClick={handleAddMembers}
            >
              Thêm{" "}
            </Button>
          </div>
        }
        centered
      >
        <ListUsers onChange={onChange} isNew />
      </Modal>
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
