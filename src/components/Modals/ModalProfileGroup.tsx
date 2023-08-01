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
import { useFnLoading, useLoading } from "hooks/useLoading";
import { FileUploader } from "react-drag-drop-files";
import { uploadFile } from "api/until";
import { useAppDispatch, useAppSelector } from "store";
import { updateMember } from "api/room";
import { changeConservation } from "store/app";
import { useCallBackApi, useFnCallbackApi } from "hooks/useCallback";
type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
};


const ModalGroupProfile = ({ isModalOpen, handleCancel, handleOk }: Props_Type) => {
  const { conservation } = useAppSelector((state) => state.app) as any
  const [avatarRoom, setAvatarRoom] = useState<any>(null)
  const [nameRoom, setNameRoom] = useState("")
  const { onLoading } = useFnLoading()
  const dispatch = useAppDispatch()
  const { onCallback } = useFnCallbackApi()
  const isLoading = useLoading("ADD_ROOM")
  const isCallBack = useCallBackApi("ADD_MEMBERS")
  useEffect(() => {
    setNameRoom(conservation?.nameRoom)
  }, [conservation, isModalOpen])
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
      onLoading({
        type: "ADD_ROOM",
        value: true
      })
      let fileUrl: any
      if (avatarRoom) {
        fileUrl = await uploadFile(avatarRoom);
        if (!fileUrl) {
          onLoading({
            type: "ADD_ROOM",
            value: false
          })
          return message.warning("Có lỗi xảy ra vui lòng thử lại sao");
        }
      }
      const res = await updateMember({
        roomId: conservation?._id,
        avatarRoom: fileUrl?.url,
        nameRoom: nameRoom
      })
      dispatch(changeConservation({
        ...conservation,
        name: res?.data?.nameRoom,
        avatarRoom: res?.data?.avatarRoom
      }))
      localStorage.setItem("conservation", JSON.stringify(res?.data))
      setNameRoom('')
      message.success("Đã cập nhật lại room")
      onCallback({
        type: "ADD_MEMBERS",
        value: !isCallBack
      })
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
      onCancel={() => {
        setNameRoom("")
        handleCancel()
      }}
      footer={
        <div>
          <Button onClick={() => {
            setNameRoom("")
            handleCancel()
          }} >Hủy</Button>
          <Button type="primary" htmlType="submit" onClick={onfinish}
            loading={isLoading}
            disabled={isLoading}
          >Cập nhật</Button>
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
                  conservation?.avatarRoom ?
                    <img src={conservation?.avatarRoom} alt="" />
                    :
                    <PlusOutlined />
              }
            </div>
          </FileUploader>
        </Col>
        <Col span={20}>
          <div className="name-group">
            <Form.Item style={{ width: "100%" }}>
              <Input placeholder="Nhập tên nhóm" value={nameRoom} onChange={(e: any) => setNameRoom(e?.target.value)} />
            </Form.Item>
          </div>
        </Col>
      </Row>

    </ModalStyled>
  );
};

export default ModalGroupProfile;
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
