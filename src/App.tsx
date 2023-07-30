import RenderRouter from "./routes";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { ConfigProvider, Spin, theme as a } from "antd";
import { colors } from "styles/theme";
import useContentResizer from "hooks/useContentResizer";
import styled from "styled-components";
import io from "socket.io-client";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSocket } from "store/app";
import { DataContext, DataProvider } from "context/globalSocket";
import { useAppSelector } from "store";

function App() {
  const height = useContentResizer();
  const context = useContext(DataContext)
  const handleSetSocket = context.setSocket
  const { conservation } = useAppSelector((state) => state.app) as any
  const { user } = useAppSelector((state) => state.user) as any
  const dispatch = useDispatch()

  useEffect(() => {

    const socket = io(`${process.env.REACT_APP_BASE_URL}`);
    socket.emit('joinApp')
    handleSetSocket(socket)
    return () => {
      socket.emit('disconnect')
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
