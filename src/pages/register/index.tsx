import type { FC } from "react";
import { Button, Card, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import styled from "styled-components";
import logo from "assets/images/photo_2023-07-26_13-50-12.jpg";
import { Link } from "react-router-dom";
import { colors } from "styles/theme";
const Register: FC = () => {
  return (
    <LoginPage className="login-page">
      <Card>
        <Form className="login-page-form">
          <div className="title">Đăng nhập vào để kết nối với ứng dụng</div>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Form.Item name="">
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item name="">
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item name="">
            <Input placeholder="Link telegram của bạn" />
          </Form.Item>
          <Form.Item name="">
            <Input placeholder="Link facebook của bạn" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 0, span: 16 }}
          >
            <Row>
              <Col>
                <Radio>Khách hàng</Radio>
              </Col>
              <Col>
                <Radio>Nhân viên kinh doanh</Radio>
              </Col>
              <Col>
                <Radio>Nhân viên kỉ thuật</Radio>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="login-page-form_button"
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

export default Register;
const LoginPage = styled.div`
  &.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8f8f8;
    height: 100%;
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
