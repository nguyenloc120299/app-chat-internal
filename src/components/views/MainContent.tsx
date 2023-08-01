import React from "react";
import styled from "styled-components";
import intro from "assets/images/intro.png";
const MainContent = () => {
  return (
    <MainContentStyled>
      <div className="body">
        <h2>Chào mừng bạn đến với ứng dụng chat nhóm</h2>{" "}
        <div
          style={{
            maxWidth: "450px",
          }}
        >
          Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng đồng nghiệp,
          kêt nối và giải quyết công việc trên mọi thiết bị.
        </div>
        <img src={intro} alt="" />
        <h3>Làm việc hiệu quả hơn với nhóm chat</h3>
        <div>Trao đổi công việc mọi lúc mọi nơi</div>
      </div>
    </MainContentStyled>
  );
};

export default MainContent;
const MainContentStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      max-width: 350px;
      width: 100%;
      margin: auto;
    }
  }
`;
