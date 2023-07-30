import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Tag,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Search from "antd/es/input/Search";
import { colors } from "styles/theme";
import { getUsers } from "api/user";
import user from "store/user";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { create } from "api/room";
import { ROLES } from "types/global";
import { Quer_User } from "types/query";
import ListUsers from "components/views/ListUsers";
import { useFnLoading, useLoading } from "hooks/useLoading";
type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
  fetchRooms: any
};


const ModalAddGroup = ({ isModalOpen, handleCancel, handleOk, fetchRooms }: Props_Type) => {

  const [members, setMembers] = useState<any>([])
  const [nameRoom, setNameRoom] = useState('')
  const { onLoading } = useFnLoading()
  const isLoading = useLoading("ADD_ROOM")
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setMembers(checkedValues)
  };
  const onfinish = async () => {
    try {
      onLoading({
        type: "ADD_ROOM",
        value: true
      })
      const res = await create({
        avatarRoom: '',
        members,
        nameRoom
      })
      await fetchRooms()
      message.success("Đã thêm room mới")
      handleCancel()
      setMembers([])
      setNameRoom('')
    } catch (error) {
      console.log(error);
      message.warning("Tạo nhóm không thành công vui lòng thử lại")
    }
    onLoading({
      type: "ADD_ROOM",
      value: false
    })
  }

  return (
    <ModalStyled
      title="Tạo nhóm"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div>
          <Button onClick={handleCancel} >Hủy</Button>
          <Button type="primary" htmlType="submit" onClick={onfinish}
            loading={isLoading}
            disabled={isLoading}
          >Tạo nhóm</Button>
        </div>
      }
      centered
    >

      <Row gutter={30}>
        <Col span={4}>
          <UploadStyled
            name="avatar"
            listType="picture-card"
            showUploadList={false}
          >
            <PlusOutlined />
          </UploadStyled>
        </Col>
        <Col span={20}>
          <div className="name-group">
            <Form.Item name="nameRoom" style={{ width: "100%" }}>
              <Input placeholder="Nhập tên nhóm" value={nameRoom} onChange={(e: any) => setNameRoom(e?.target.value)} />
            </Form.Item>
          </div>
        </Col>
      </Row>

      <ListUsers onChange={onChange} />


    </ModalStyled>
  );
};

export default ModalAddGroup;
const ModalStyled = styled(Modal)`
  .name-group {
    height: 100%;
    display: flex;
    align-items: center;
    .ant-input {
      border: none;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      &:focus {
        box-shadow: none;
      }
    }
  }
  
`;

const UploadStyled = styled(Upload)`
  .ant-upload {
    border-radius: 50% !important;
    width: 60px !important;
    height: 60px !important;
  }
`;
