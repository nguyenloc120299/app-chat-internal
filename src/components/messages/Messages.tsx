import { TypeSend } from "api/chat";
import TagsRole from "components/views/TagsRole";
import React from "react";
import { AudioMutedOutlined } from "@ant-design/icons";
import { useAppSelector } from "store";
import moment from "moment";
import { Avatar } from "antd";
import useToggle from "hooks/useToggle";
import LightBoxFile from "components/Modals/LightBoxFile";
type Props_type = {
  message: any;
  handleLightBox: any
};
const Messages = ({ message, handleLightBox }: Props_type) => {
  const { conservation } = useAppSelector((state) => state.app) as any;
  const { user } = useAppSelector((state) => state.user) as any;
  const [modalFile, toggleModalFile] = useToggle(false);
  return (
    <>

      {message?.sender?._id === user?._id ? (
        <div className="message-sender">
          <div className="main-msg">
            <div className="content-msg">
              <div className="auth">
                {message?.sender?.name}
                <TagsRole role={message?.role} />
              </div>
              <div> {message?.content}</div>
              {message?.file && (
                <div className="file-content" onClick={() => handleLightBox({
                  file: message?.file,
                  typeFile: message?.typeFile
                })}>
                  {message?.typeFile === TypeSend.IMAGE && (
                    <img src={message?.file} alt="file" />
                  )}
                  {message?.typeFile === TypeSend.VIDEO && (
                    <div className="video-render" >
                      <video src={message?.file} autoPlay muted loop />
                      <div className="icon-muted" >
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
              <Avatar size={40} />
            </div>
          </div>
        </div>
      ) : (
        <div className="message-recipient">
          <div className="main-msg">
            <div>
              <Avatar size={40} />
            </div>
            <div className="content-msg">
              <div className="auth">
                {message?.sender?.name}
                <TagsRole role={message?.role} />
              </div>
              <div>{message?.content}</div>
              {message?.file && (
                <div className="file-content" onClick={() => handleLightBox({
                  file: message?.file,
                  typeFile: message?.typeFile
                })}>
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
