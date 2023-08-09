import { FC, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Checkbox,
  Row,
  Radio,
  RadioChangeEvent,
  message,
} from "antd";
import styled from "styled-components";
import logo from "assets/images/photo_2023-07-26_13-50-12.jpg";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "styles/theme";
import { isMobile } from "mobile-device-detect";
import { Register, ROLES } from "types/global";
import { register } from "api/user";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { useForm } from "antd/es/form/Form";

const RegisterForm: FC = () => {
  const [role, setRole] = useState<ROLES>(ROLES.CUSTOMER);
  const { onLoading } = useFnLoading();
  const isLoading = useLoading("REGISTER");
  const [form] = useForm();
  const navigate = useNavigate()
  const onChange = (e: RadioChangeEvent) => {
    setRole(e.target.value);
  };
  const validateConfirmPassword = (_: any, value: any) => {
    const { getFieldValue } = form;
    const passwordFieldValue = getFieldValue('password');

    if (value && value !== passwordFieldValue) {
      return Promise.reject(new Error('Mật khẩu không khớp'));
    }

    return Promise.resolve();
  };
  const onFinished = async (formData: Register) => {
    onLoading({
      type: "REGISTER",
      value: true,
    });
    try {
      await register({
        name: formData.name,
        password: formData.password,
        phone: formData.phone,
        roleCode: role,
        linkFaceBook: formData.linkFaceBook,
        linkTelegram: formData.linkTelegram
      });
    } catch (error) {
      console.log(error);
    }
    form.resetFields();
    onLoading({
      type: "REGISTER",
      value: false,
    });
    message.success("Đăng kí thành công")
    navigate('/login')
  };
  return (
    <LoginPage className="login-page">
      <Card>
        <Form<Register> className="login-page-form" onFinish={onFinished}>
          <div className="title">Đăng kí tài khoản để có thể kết nối với ứng dụng</div>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
              {
                pattern: /^(0|\+84)(\d{9,10})$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
              },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="linkTelegram"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập link telegram",
              },
              {
                pattern: /^https?:\/\/t\.me\//i,
                message: "Link telegram của bạn không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Link telegram của bạn" />
          </Form.Item>
          <Form.Item
            name="linkFaceBook"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập link facebook",
              },
              {
                pattern: /^https:\/\/(?:www|m)\.facebook\.com\//i,
                message: "Link facebook của bạn không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Link facebook của bạn" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },

            ]}
          >
            <Input type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu",
              },

            ]}
          >
            <Input type="password" placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Radio.Group onChange={onChange} value={role}>
              <Radio value={ROLES.EMPLOYEE}>Nhân viên kinh doanh</Radio>
              <Radio value={ROLES.CUSTOMER}>Khách hàng</Radio>
              <Radio value={ROLES.TECHNIQUE}>Nhân viên kỉ thuật</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="login-page-form_button"
              loading={isLoading}
            >
              Đăng kí
            </Button>
          </Form.Item>
          <div className="text-note">
            Bạn chưa có tài khoản?
            <span>
              <Link to="/login"> Đăng nhập</Link>
            </span>
          </div>
        </Form>
      </Card>
    </LoginPage>
  );
};

export default RegisterForm;
const LoginPage = styled.div`
  &.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8f8f8;
    height: 100%;
    .ant-card {
      height: ${isMobile ? "100%" : "auto"};
    }
    .title {
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
    .text-note {
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      span {
        a {
          color: ${colors.mainColor};
          font-weight: 500;
        }
      }
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 150px;
      }
    }
    .ant-card-body {
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
      border-radius: 20px;
    }
    form {
      width: 400px;
      padding: 40px 30px 10px;
      border-radius: 10px;
      h2 {
        text-align: center;
      }
      button {
        width: 100%;
      }
    }
  }
`;
