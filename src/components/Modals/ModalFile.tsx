import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  message as toast,
  message,
} from "antd";
import EmojiPicker from "emoji-picker-react";
import { FrownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store";
import { useFnLoading } from "hooks/useLoading";
import { updateMessages } from "store/chat";
import { SendData, sendMess, TypeSend, upload } from "api/chat";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import { useSocket } from "hooks/useSocket";
import { isMobile } from "mobile-device-detect";
import { TYPEFILE, uploadFile } from "api/until";

type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
  file?: any;
  setPage: any;
};
const ModalFile = ({
  isModalOpen,
  handleOk,
  handleCancel,
  file,
  setPage,
}: Props_Type) => {
  const [contentMsg, setContentMsg] = useState("");
  const { conservation } = useAppSelector((state) => state.app) as any;
  const { user } = useAppSelector((state) => state.user) as any;
  const dispatch = useAppDispatch();
  const { onLoading } = useFnLoading();
  const { handleSendMessage } = useSocket();
  const isImageFile = (file: File): boolean => {
    return file?.type.startsWith("image/");
  };

  const isVideoFile = (file: File): boolean => {
    return file?.type.startsWith("video/");
  };

  const senMessageChat = async () => {
    if (!conservation) return toast.warning("Bạn chưa có nhóm chát nào");
    onLoading({
      type: "SEND",
      value: true,
    });
    try {
      setContentMsg("");
      setPage(1);
      dispatch(
        updateMessages({
          content: contentMsg,
          sender: {
            name: user?.name,
            _id: user?._id,
          },
          createdAt: new Date(),
          file: URL.createObjectURL(file),
          typeFile: isImageFile(file)
            ? TypeSend.IMAGE
            : isVideoFile(file)
              ? TypeSend.VIDEO
              : TypeSend.ORDER,
          role: user?.roles[0]?.code,
        })
      );
      handleCancel();
      const fileUrl = await uploadFile(file, TYPEFILE.MESSAGE);
      if (!fileUrl)
        return message.warning("Có lỗi xảy ra vui lòng thử lại sao");

      const sendData = {
        content: contentMsg,
        room: conservation?._id,
        role: user?.roles[0]?.code,
        file: fileUrl?.url,
        typeFile: isImageFile(file)
          ? TypeSend.IMAGE
          : isVideoFile(file)
            ? TypeSend.VIDEO
            : TypeSend.ORDER,
      } as SendData;

      const res = await sendMess(sendData);
      handleSendMessage({
        content: !contentMsg ? "Đã gửi 1 file" : contentMsg,
        createdAt: new Date(),
        roomId: conservation?._id,
        role: user?.roles[0],
        sender: {
          name: user?.name,
          _id: user?._id,
        },
        file: fileUrl?.url,
        typeFile: isImageFile(file)
          ? TypeSend.IMAGE
          : isVideoFile(file)
            ? TypeSend.VIDEO
            : TypeSend.ORDER,
      });
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
    <ModalStyled
      title="Gửi file"
      open={isModalOpen}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      width={375}
      footer={
        <div>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" onClick={senMessageChat}>
            Gửi
          </Button>
        </div>
      }
    >
      {isVideoFile(file) && (
        <video
          src={URL.createObjectURL(file)}
          controls
          className="video-review"
        />
      )}

      {isImageFile(file) && (
        <img
          src={URL.createObjectURL(file)}
          alt="file"
          className="img-review"
        />
      )}
      <Form layout="vertical" autoComplete="off">
        <Form.Item name="contentMessage" label="Caption">
          <Row>
            <Col span={22}>
              <Input
                className="input-caption"
                value={contentMsg}
                onChange={(e: any) => setContentMsg(e?.target.value)}
              />
            </Col>
            <Col span={2}>
              <Popover
                content={
                  <EmojiPicker
                    onEmojiClick={(emojis: any) =>
                      setContentMsg(contentMsg + emojis?.emoji)
                    }
                    width={isMobile ? "100%" : 450}
                    height={isMobile ? 350 : "450px"}
                  />
                }
                title="EMOJI"
                trigger={"click"}
              >
                <FrownOutlined
                  style={{ fontSize: "30px", color: "#aaa", cursor: "pointer" }}
                />
              </Popover>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </ModalStyled>
  );
};

export default ModalFile;
const ModalStyled = styled(Modal)`
  .img-review {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .video-review {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  label {
    font-weight: 500;
  }
  .input-caption {
    border-radius: unset;
    border: none;
    border-bottom: 1px solid #ccc;
    &:focus {
      box-shadow: none;
    }
  }
`;
