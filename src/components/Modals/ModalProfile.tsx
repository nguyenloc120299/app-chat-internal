import { Avatar, Button, Form, Input, Modal, Tag } from "antd";

import styled from "styled-components";
type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
  isShow?: boolean;
};
const ModalProfile = ({
  isModalOpen,
  handleOk,
  handleCancel,
  isShow,
}: Props_Type) => {
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
      <div className="cover"></div>
      <div className="avt">
        <Avatar size={64} />
      </div>
      <div style={{
        fontSize:"18px",
        fontWeight:700
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
        <FormStyled labelCol={{ span: 4 }}>
          <Form.Item label="Họ tên" name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Telegram" name="username">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Facebook" name="username">
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
    background: #ccc;
    border-radius: 10px;
  }
  .avt {
    display: flex;
    justify-content: center;
    margin-top: -32px;
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
