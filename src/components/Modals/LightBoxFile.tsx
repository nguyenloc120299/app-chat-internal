import { Modal } from 'antd'
import { TypeSend } from 'api/chat'
import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
type Props_Type = {
  lightBox: boolean,
  fileSelect: any,
  handleCloseLightBox: any
}
const LightBoxFile = ({ lightBox, fileSelect, handleCloseLightBox }: Props_Type) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<any>(null);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <LightBoxStyled width={1000} open={true} centered onCancel={() => {
      handleCloseLightBox()
      handleVideoClick()
    }}
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      }}
      footer={null}
    >
      <div className='content' onClick={() => {
        handleCloseLightBox()

      }}>
        {fileSelect?.typeFile === TypeSend.IMAGE && (
          <img src={fileSelect?.file} alt="file" />
        )}
        {fileSelect?.typeFile === TypeSend.VIDEO && (
          <ReactPlayer url={fileSelect?.file} controls ref={playerRef} playing={isPlaying}
            width={"100%"}
          />
        )}
      </div>
    </LightBoxStyled>
  )
}

export default LightBoxFile

const LightBoxStyled = styled(Modal)`

.ant-modal-content{
  background: transparent;
  box-shadow: unset;
}
.ant-modal-content{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img,video{
    width: 100%;
    height: 100%;
  }
}
.ant-modal-close-x{
  color: #fff;
  font-weight: 700;
  font-size: 30;
}
`

