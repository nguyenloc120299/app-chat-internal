import { Avatar, Layout, Tag } from "antd";
import FooterChat from "components/FooterChat";
import useContentResizer from "hooks/useContentResizer";
import { isMobile } from "mobile-device-detect";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors } from "styles/theme";

const Home = () => {
  const refDisplay = useRef<any>();
  const scrollToBottom = () => {
    const chatDisplay = refDisplay?.current;
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <HomeStyled>
      <div className="content" ref={refDisplay}>
        <div className="message-recipient">
          <div className="main-msg">
            <div>
              <Avatar size={40} />
            </div>
            <div className="content-msg">
              <div className="auth">
                Nguyễn Thành Lộc
                <Tag style={{ marginLeft: "10px" }} color="cyan">
                  Nhân viên kinh doanh
                </Tag>
              </div>
              <div>
                Thư viện, [5/14/2023 7:23 PM] - Khung h4 khi quay về retest ở
                vùng hổ trợ thì bật lại giảm và hình thành cây nến pinbar -
                Khung h1 có 3 cây nến giảm liên tiếp Thư viện, [7/14/2023 2:44
                PM] sẽ hiện thông báo : này e nói tóm tắt thôi nha lúc vào thực
                tế thì mình cứ chỉnh sửa theo cái cốt như này. Công ty .....(
                tên app vay) đã tiếp nhận hồ sơ vay tín dụng của .. ( tên
                khách). Chúng tôi sẽ chuyển hồ sơ từ APP ra hồ sơ giấy và nộp
                cho Cty tín dụng vvvvv để tiến hành duyệt hồ sơ. phí chuyển hồ
                sơ là 99.000đ. Chú ý: cty tín dụng vvvvv hợp tác với APP vvvv
                vẫn châm trước cho các KH bị quá khứ nợ xấu. tuy nhiên hạn mức
                vay sẽ được cấp thấp hơn so với hồ sơ vay có lịch sử tốt. Thư
                viện, [7/14/2023 2:44 PM] đoạn này phải tung bông tung hoa lên
                cho nó sướng vì được duyệt vay
              </div>
              <div className="time">1 giờ trước</div>
            </div>
          </div>
        </div>
        <div className="message-sender">
          <div className="main-msg">
            <div className="content-msg">
              <div className="auth">
                Nguyễn Thành Lộc
                <Tag style={{ marginLeft: "10px" }} color="warning">
                  Nhân viên kỉ thuật
                </Tag>
              </div>
              <div>111111</div>
              <div className="time">1 giờ trước</div>
            </div>
            <div>
              <Avatar size={40} />
            </div>
          </div>
        </div>
        <div className="message-sender">
          <div className="main-msg">
            <div className="content-msg">
              <div className="auth">
                Nguyễn Thành Lộc
                <Tag style={{ marginLeft: "10px" }} color="pink">
                  Khách hàng
                </Tag>
              </div>
              <div>
                Thư viện, [5/14/2023 7:23 PM] - Khung h4 khi quay về retest ở
                vùng hổ trợ thì bật lại giảm và hình thành cây nến pinbar -
                Khung h1 có 3 cây nến giảm liên tiếp Thư viện, [7/14/2023 2:44
                PM] sẽ hiện thông báo : này e nói tóm tắt thôi nha lúc vào thực
                tế thì mình cứ chỉnh sửa theo cái cốt như này
              </div>
              <div className="time">1 giờ trước</div>
            </div>
            <div>
              <Avatar size={40} />
            </div>
          </div>
        </div>
      </div>
      <FooterChat />
    </HomeStyled>
  );
};

export default Home;
const HomeStyled: any = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    background: #cccc;
    padding: 20px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .message-recipient {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 4px;
      margin-bottom: 15px;
      margin-right: ${isMobile ? "10px" : "150px"};
      .main-msg {
        display: flex;
        gap: 5px;
        .content-msg {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px;
          background: #f0ebeb;
          border-radius: 8px;
          white-space: pre-line;
          .auth {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 7px;
          }
          .time {
            text-align: right;
            width: 100%;
            margin-top: 10px;
            font-size: 10px;
            color: #aaa;
          }
        }
      }
    }
    .message-sender {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 0px;
      gap: 10px;
      margin-bottom: 5px;
      margin-left: ${isMobile ? "10px" : "150px"};
      .main-msg {
        display: flex;
        gap: 5px;
        .content-msg {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px;
          background: ${colors.mainColor};
          color: #f0ebeb;
          border-radius: 8px;
          white-space: pre-line;
          .auth {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 7px;
          }
          .time {
            text-align: right;
            width: 100%;
            margin-top: 10px;
            font-size: 10px;
            color: #fff;
          }
        }
      }
    }
  }
`;
