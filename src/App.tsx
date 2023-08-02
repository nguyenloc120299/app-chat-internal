import RenderRouter from "./routes";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { ConfigProvider, Spin, theme as a } from "antd";
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
  getFirebaseToken,
  onForegroundMessage,
} from "./firebase-config/firebaseConfig";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function App() {
  const height = useContentResizer();
  const context = useContext(DataContext);
  const handleSetSocket = context.setSocket;

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

  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        console.log("Firebase token: ", firebaseToken);
      })
      .catch((err) =>
        console.error("An error occured while retrieving firebase token. ", err)
      );
  };

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

  useEffect(() => {
    // Check if the browser supports notifications
    if ("Notification" in window) {
      // Request permission for notifications
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          handleGetFirebaseToken();
          // Permission has been granted, you can now initialize Firebase Messaging and retrieve the token.
          // Your Firebase Messaging setup code goes here.
        } else if (permission === "denied") {
          // The user denied permission for notifications. Handle it appropriately.
          console.log("Notification permission denied");
        } else if (permission === "default") {
          // The user closed the permission request dialog without granting or denying permission.
          // You can prompt the user again or handle it based on your application logic.
          console.log("Notification permission dismissed");
        }
      });
    }
    
  }, []);
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
