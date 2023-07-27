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
} from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Search from "antd/es/input/Search";
import { colors } from "styles/theme";
type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
};
const ModalAddGroup = ({ isModalOpen, handleCancel, handleOk }: Props_Type) => {
  return (
    <ModalStyled
      title="Tạo nhóm"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary">Tạo nhóm</Button>
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
            <Input placeholder="Nhập tên nhóm" />
          </div>
        </Col>
      </Row>
      <div style={{ marginBottom: "10px" }}>Thêm bạn vào nhóm</div>
      <Search placeholder="Nhập tên, số điện thoại" allowClear size="large" />
      <div style={{ margin: "20px 0", cursor: "pointer" }}>
        <Tag color={colors.mainColor}>Tất cả</Tag>
        <Tag>Khách hàng</Tag>
        <Tag>Nhân viên kinh doanh</Tag>
        <Tag>Nhân viên kỉ thuật</Tag>
      </div>
      <div className="list-user">
        <div className="user-row">
          <Radio />
          <Avatar size={40} />
          <div className="name">Nguyễn Thành Lộc</div>
        </div>
        <div className="user-row">
          <Radio />
          <Avatar size={40} />
          <div className="name">Nguyễn Thành Lộc</div>
        </div>
        <div className="user-row">
          <Radio />
          <Avatar size={40} />
          <div className="name">Nguyễn Thành Lộc</div>
        </div>
        <div className="user-row">
          <Radio />
          <Avatar size={40} />
          <div className="name">Nguyễn Thành Lộc</div>
        </div>
        <div className="user-row">
          <Radio />
          <Avatar size={40} />
          <div className="name">Nguyễn Thành Lộc</div>
        </div>
      </div>
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
  .list-user {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .user-row {
      display: flex;
      align-items: center;
      gap: 5px;
      .name {
        font-size: 14px;
        font-weight: 500;
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
