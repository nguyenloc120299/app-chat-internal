import RenderRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, Spin, theme as a } from "antd";
import { colors } from "styles/theme";
import useContentResizer from "hooks/useContentResizer";
import styled from "styled-components";
function App() {
  const height = useContentResizer();
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
