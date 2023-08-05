import { Avatar, Button, Form, Input, Modal, Tag, message } from "antd";
import coverImage from "assets/images/coverImage.jpg";
import styled from "styled-components";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { updateUser } from "api/user";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { TYPEFILE, uploadFile } from "api/until";
import { useAppDispatch } from "store";
import { setUser } from "store/user";
import TagsRole from "components/views/TagsRole";
import moment from "moment";

type Props_Type = {
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel: any;
  isShow?: boolean;
  user?: any;
};

const ModalProfile = ({
  isModalOpen,
  handleOk,
  handleCancel,
  isShow,
  user,
}: Props_Type) => {
  const [avatar, setAvatar] = useState<any>(null);
  const form = useForm();
  const isLoading = useLoading("UPDATE_USER");
  const dispatch = useAppDispatch();
  const { onLoading } = useFnLoading();
  const handleChange = (file: any) => {
    if (!file) {
      return message.warning("Bạn chưa chọn file");
    }
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return message.warning("Vui long chọn file nhở hơn 5MP");
    }
    setAvatar(file);
  };
  // const onFinish = (form: any) => {
  //   setInitialValues({ ...initialValues, ...form });
  // };

  const handleSubmit = async (form: any) => {
    try {
      onLoading({
        type: "UPDATE_USER",
        value: true,
      });
      let fileUrl;
      if (avatar) {
        fileUrl = await uploadFile(avatar, TYPEFILE.AVATAR);
        if (!fileUrl) {
          onLoading({
            type: "UPDATE_USER",
            value: false,
          });
          return message.warning("Có lỗi xảy ra vui lòng thử lại sao");
        }
      }
      const res = await updateUser({
        linkFaceBook: form.linkFaceBook,
        linkTelegram: form.linkTelegram,
        name: form.name,
        profilePicUrl: fileUrl?.url,
      });
      if (res?.data) {
        console.log(res?.data);

        dispatch(setUser(res.data));
      }
      message.success("Đã cập nhật thành công");
      handleCancel();
    } catch (error) {
      console.log(error);
    }
    onLoading({
      type: "UPDATE_USER",
      value: false,
    });
  };

  return (
    <ModalStyled
      title="Thông tin tài khoản"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div className="cover"></div>
      <div className="avt">
        <div style={{ position: "relative", width: "64px", height: "64px" }}>
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="avatar"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <Avatar
              size={64}
              icon={
                user?.profilePicUrl ? (
                  <img src={user?.profilePicUrl} alt="avt" />
                ) : (
                  <UserOutlined />
                )
              }
            />
          )}
          {!isShow && (
            <div className="uploadAvt">
              <FileUploader handleChange={handleChange}>
                <UploadOutlined
                  style={{
                    color: "#888",
                    cursor: "pointer",
                  }}
                />
              </FileUploader>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        Thông tin cá nhân
      </div>
      {isShow ? (
        <div className="info">
          <div className="des">
            Ngày tham gia:
            <span>{moment(user?.createdAt).format("DD/MM/YYYY")}</span>
          </div>
          <div className="des">
            Số điện thoai:
            <span>{user?.phone}</span>
          </div>
          <div className="des">
            Telegram:
            <span>
              <a href={user?.linkTelegram} target={"_blank"}>
                {user?.linkTelegram}
              </a>
            </span>
          </div>
          <div className="des">
            Facebook:
            <span>
              <a href={user?.linkFaceBook} target={"_blank"}>
                {user?.linkFaceBook}
              </a>
            </span>
          </div>
          {/* <div className="des">
            Vai trò:
            <span>
              <TagsRole role={user?.role}/>
            </span>
          </div> */}
        </div>
      ) : (
        <FormStyled
          labelCol={{ span: 6 }}
          initialValues={{
            phone: user?.phone,
            linkTelegram: user?.linkTelegram || "",
            linkFaceBook: user?.linkFaceBook || "",
            name: user?.name,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Số điện thoại" name="phone">
            <Input size="large" disabled />
          </Form.Item>
          <Form.Item label="Họ tên" name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Telegram"
            name="linkTelegram"
            rules={[
              {
                pattern: /^https?:\/\/t\.me\//i,
                message: "Link telegram của bạn không hợp lệ",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Facebook"
            name="linkFaceBook"
            rules={[
              {
                pattern: /^https:\/\/(?:www|m)\.facebook\.com\//i,
                message: "Link facebook của bạn không hợp lệ",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "5px",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Cập nhật
            </Button>
          </div>
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
    .ant-avatar {
      position: relative;
    }
    .uploadAvt {
      position: absolute;
      bottom: 0;
      right: 0;
      cursor: pointer;
      width: 20px;
      height: 20px;
      background: #dddd;
      border: 1px solid #aaa;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
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
