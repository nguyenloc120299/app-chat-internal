import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { create } from "api/room";

import ListUsers from "components/views/ListUsers";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { FileUploader } from "react-drag-drop-files";
import { TYPEFILE, uploadFile } from "api/until";
import { useSocket } from "hooks/useSocket";
type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
  fetchRooms: any;
  onupdateRoom: any
};


const ModalAddGroup = ({ isModalOpen, handleCancel, handleOk, fetchRooms, onupdateRoom }: Props_Type) => {
  const [avatarRoom, setAvatarRoom] = useState<any>(null)
  const {handleAddRoom} = useSocket()
  const [members, setMembers] = useState<any>([])
  const [nameRoom, setNameRoom] = useState('')
  const { onLoading } = useFnLoading()
  const isLoading = useLoading("ADD_ROOM")
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setMembers(checkedValues)
  };
  const handleChange = (file: any) => {
    if (!file) {
      return message.warning("Bạn chưa chọn file");
    }
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return message.warning("Vui long chọn file nhở hơn 5MP");
    }
    setAvatarRoom(file);
  }
  const onfinish = async () => {
    try {
      setNameRoom('')
      onLoading({
        type: "ADD_ROOM",
        value: true
      })
      let fileUrl
      if (avatarRoom) {
        fileUrl = await uploadFile(avatarRoom, TYPEFILE.AVATAR);
        if (!fileUrl)
          return message.warning("Có lỗi xảy ra vui lòng thử lại sao");
      }
      const res = await create({
        avatarRoom: fileUrl ? fileUrl?.url : null,
        members,
        nameRoom
      })
      setMembers([])
      message.success("Đã thêm room mới")
      // onupdateRoom(res?.data)
      handleAddRoom(res?.data)
      handleCancel()

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
          <FileUploader handleChange={handleChange}>
            <div className="avatar">
              {
                avatarRoom ? <img src={URL.createObjectURL(avatarRoom)} />
                  :
                  <PlusOutlined />
              }
            </div>
          </FileUploader>
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
  .avatar{
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-style: dashed;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
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
