import { Avatar, Button, Form, Input, Modal, Tag, message } from "antd";
import coverImage from 'assets/images/coverImage.jpg'
import styled from "styled-components";
import {
  UserOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";

type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
  isShow?: boolean;
  user?: any
};

const ModalProfile = ({
  isModalOpen,
  handleOk,
  handleCancel,
  isShow,
  user
}: Props_Type) => {
  const [avatar, setAvatar] = useState<any>(null)

  const handleChange = (file: any) => {
    if (!file) {
      return message.warning("Bạn chưa chọn file");
    }
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return message.warning("Vui long chọn file nhở hơn 5MP");
    }
    setAvatar(file);
  }
  return (
    <ModalStyled
      title="Thông tin tài khoản"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary">Cập nhật</Button>
        </div>
      }
      centered
    >
      <div className="cover">

      </div>
      <div className="avt">
        <div style={{ position: 'relative', width: "64px", height: "64px" }}>
          {
            avatar ?
              <img src={URL.createObjectURL(avatar)} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
              :
              <Avatar size={64} icon={<UserOutlined />} />
          }

          <div className="uploadAvt">
            <FileUploader handleChange={handleChange}>
              <UploadOutlined style={{
                color: "#000"
              }} />
            </FileUploader>
          </div>
        </div>

      </div>
      <div style={{
        fontSize: "18px",
        fontWeight: 700
      }}>Thông tin cá nhân</div>
      {isShow ? (
        <div className="info">
          <div className="des">
            Số điện thoai:
            <span>0378028840</span>
          </div>
          <div className="des">
            Telegram:
            <span>
              <a href="https://t.me/bot_future_bot" target={"_blank"}>
                https://t.me/bot_future_bot
              </a>
            </span>
          </div>
          <div className="des">
            Facebook:
            <span>
              <a href="https://t.me/bot_future_bot" target={"_blank"}>
                https://facebook.com
              </a>
            </span>
          </div>
          <div className="des">
            Vai trò:
            <span>
              <Tag>Kỉ thuật</Tag>
            </span>
          </div>
        </div>
      ) : (
        <FormStyled labelCol={{ span: 6 }} initialValues={{
          phone: user?.phone,
          linkTelegram: user?.linkTelegram,
          linkFaceBook: user?.linkFaceBook,
          name: user?.name
        }}

        >
          <Form.Item label="Số điện thoại" name="phone">
            <Input size="large" disabled />
          </Form.Item>
          <Form.Item label="Họ tên" name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Telegram" name="linkTelegram">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Facebook" name="linkFaceBook">
            <Input size="large" />
          </Form.Item>
        </FormStyled>
      )}
    </ModalStyled>
  );
};

export default ModalProfile;

const ModalStyled = styled(Modal)`
  .cover {
    width: 100%;
    height: 100px;
    background: url(${coverImage});
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    background-size: cover;
  }
  .avt {
    display: flex;
    justify-content: center;
    margin-top: -32px;
    .ant-avatar{
    position: relative;
    
  
    
  }
  .uploadAvt{
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    .des {
      font-size: 16px;
      display: flex;
      gap: 10px;
      span {
        font-weight: 500;
      }
    }
  }
`;
const FormStyled = styled(Form)`
  margin-top: 10px;
`;
