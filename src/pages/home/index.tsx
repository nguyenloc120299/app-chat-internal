import { Layout } from "antd";
import FooterChat from "components/FooterChat";
import useContentResizer from "hooks/useContentResizer";
import React from "react";
import styled from "styled-components";

const Home = () => {

  return (
    <HomeStyled >
      <div className="content">content</div>
      <FooterChat/>
    </HomeStyled>
  );
};

export default Home;
const HomeStyled : any= styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
`;
