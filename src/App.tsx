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
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function App() {
  const height = useContentResizer();
  const context = useContext(DataContext);
  const handleSetSocket = context.setSocket;
  // const { conservation } = useAppSelector((state) => state.app) as any;
  // const { user } = useAppSelector((state) => state.user) as any;
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
