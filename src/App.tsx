import RenderRouter from "./routes";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Button, ConfigProvider, notification, Spin, theme as a } from "antd";
import { colors } from "styles/theme";
import useContentResizer from "hooks/useContentResizer";
import styled from "styled-components";
import io from "socket.io-client";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DataContext, DataProvider } from "context/globalSocket";
import { useLoading } from "hooks/useLoading";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "assets/images/photo_2023-07-26_13-50-12.jpg";
import {
  handleGetFirebaseToken,
  onForegroundMessage,
} from "./firebase-config/firebaseConfig";
import { useAppSelector } from "store";
import {
  ArgsProps,
  NotificationPlacement,
} from "antd/es/notification/interface";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function App() {
  const height = useContentResizer();
  const context = useContext(DataContext);
  const handleSetSocket = context.setSocket;
  const { user } = useAppSelector((state) => state.user);
  const isFetchRooms = useLoading("FETCH");

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BASE_URL}`);
    socket.emit("joinApp");
    handleSetSocket(socket);
    return () => {
      socket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
        console.log("Received foreground message: ", payload);
      })
      .catch((err) =>
        console.log(
          "An error occured while retrieving foreground message. ",
          err
        )
      );
  }, []);
  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          handleGetFirebaseToken();
        } else if (permission === "denied") {
          console.log("Notification permission denied");
          openNotification("top");
        } else if (permission === "default") {
          openNotification("top");
          console.log("Notification permission dismissed");
        }
      });
    } else {
      alert("This browser does not support notifications.");
    }
  };
  const openNotification = (placement: NotificationPlacement) => {
    notification.open({
      message: `Vui lòng cho phép trình duyệt được bật thông báo`,
      description:
        "Để có thể nhận được tinh nhắn khi tới vui lòng cho phép trình duyệt được bật thông báo",
      placement,
      btn: <Button onClick={() => Notification.requestPermission()}>Câp quyền</Button>

    } as ArgsProps);
  };
  useEffect(() => {
    if (user) {
      requestNotificationPermission();
    }
  }, [user]);
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: colors.mainColor, fontSize: 15 },
        algorithm: a.defaultAlgorithm,
      }}
    >
      <AppStyle className="App" height={height}>
        <LoadingPage isLoading={isFetchRooms}>
          <div className="main">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <Spin indicator={antIcon} />
            Đang đăng nhập ...
          </div>
        </LoadingPage>
        <Router>
          <RenderRouter />
        </Router>
      </AppStyle>
    </ConfigProvider>
  );
}

export default App;
const AppStyle: any = styled.div`
  height: ${(props: any) => props.height}px !important;
`;
const LoadingPage: any = styled.div`
  position: fixed;
  visibility: ${(props: any) => (props.isLoading ? "visible" : "hidden")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    font-weight: 700;
    .logo {
      max-width: 300px;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
