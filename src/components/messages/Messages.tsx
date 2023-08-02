import { TypeSend } from "api/chat";
import TagsRole from "components/views/TagsRole";
import {
  UserOutlined,
} from "@ant-design/icons";
import { AudioMutedOutlined } from "@ant-design/icons";
import { useAppSelector } from "store";
import moment from "moment";
import { Avatar } from "antd";

type Props_type = {
  message: any;
  handleLightBox: any,
  messUnread: any
};
const Messages = ({ message, handleLightBox, messUnread }: Props_type) => {
  const { user } = useAppSelector((state) => state.user) as any;
  return (
    <>
      {
        (
          message?._id === messUnread?._id &&
          user && message?.sender?._id !== user?._id
        )
        &&
        <div className="mess-unread">Tin nhắn chưa đọc</div>
      }
      {message?.sender?._id === user?._id ? (
        <div className="message-sender" id={message?._id}>
          <div className="main-msg">
            <div className="content-msg">
              <div className="auth">
                {message?.sender?.name}
                <TagsRole role={message?.role} />
              </div>
              <div> {message?.content}</div>
              {message?.file && (
                <div
                  className="file-content"
                  onClick={() =>
                    handleLightBox({
                      file: message?.file,
                      typeFile: message?.typeFile,
                    })
                  }
                >
                  {message?.typeFile === TypeSend.IMAGE && (
                    <img src={message?.file} alt="file" />
                  )}
                  {message?.typeFile === TypeSend.VIDEO && (
                    <div className="video-render">
                      <video src={message?.file} autoPlay muted loop />
                      <div className="icon-muted">
                        <AudioMutedOutlined />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="time">
                {moment(new Date(message?.createdAt)).fromNow()}
              </div>
            </div>
            <div>
              <Avatar
                size={40}
                icon={
                  message?.sender?.profilePicUrl ? (
                    <img src={message?.sender?.profilePicUrl} alt="avt" />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="message-recipient" id={message?._id}>
          <div className="main-msg">
            <div>
              <Avatar
                size={40}
                icon={
                  message?.sender?.profilePicUrl ? (
                    <img src={message?.sender?.profilePicUrl} alt="avt" />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            </div>
            <div className="content-msg">
              <div className="auth">
                {message?.sender?.name}
                <TagsRole role={message?.role} />
              </div>
              <div>{message?.content}</div>
              {message?.file && (
                <div
                  className="file-content"
                  onClick={() =>
                    handleLightBox({
                      file: message?.file,
                      typeFile: message?.typeFile,
                    })
                  }
                >
                  {message?.typeFile === TypeSend.IMAGE && (
                    <img src={message?.file} alt="file" />
                  )}
                  {message?.typeFile === TypeSend.VIDEO && (
                    <div className="video-render">
                      <video src={message?.file} autoPlay muted loop />
                      <div className="icon-muted">
                        <AudioMutedOutlined />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="time">
                {moment(new Date(message?.createdAt)).fromNow()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
