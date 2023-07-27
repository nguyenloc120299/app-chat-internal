import type { FC } from "react";
import { Button, Card, Form, Input } from "antd";
import styled from "styled-components";
import logo from "assets/images/photo_2023-07-26_13-50-12.jpg";
import { Link } from "react-router-dom";
import { colors } from "styles/theme";
import { isMobile } from "mobile-device-detect";
const LoginForm: FC = () => {
  const onFinished = async (form: any) => {
    console.log(form);
  };
  return (
    <LoginPage className="login-page">
      <Card>
        <Form className="login-page-form" onFinish={onFinished}>
          <div className="title">Đăng nhập vào để kết nối với ứng dụng</div>
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

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="login-page-form_button"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="text-note">
            Bạn chưa có tài khoản?
            <span>
              <Link to="/register"> Đăng kí</Link>
            </span>
          </div>
        </Form>
      </Card>
    </LoginPage>
  );
};

export default LoginForm;
const LoginPage = styled.div`
  &.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8f8f8;
    height: 100%;
    overflow-y: scroll;
    .ant-card {
      height: ${isMobile ? "100%" : "auto" };
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
      width: 375px;
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
