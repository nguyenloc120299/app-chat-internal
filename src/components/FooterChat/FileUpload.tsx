import { message, Upload } from "antd";
import React, { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";

import { FileUploader } from "react-drag-drop-files";
import useToggle from "hooks/useToggle";
import ModalFile from "components/Modals/ModalFile";
type Props_Type = {
  setPage: any
};
const FileUpload = ({ setPage }: Props_Type) => {
  const fileTypes = ["JPG", "PNG", "GIF", "MP4"];
  const [file, setFile] = useState(null);
  const [modalFile, toggleModalFile] = useToggle(false);
  const handleChange = (file: any) => {
    if (!file) {
      return message.warning("Bạn chưa chọn file");
    }
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return message.warning("Vui long chọn file nhở hơn 5MP");
    }
    setFile(file);
    toggleModalFile();
  };
  const onCloseModal = () => {
    toggleModalFile();
    setFile(null);
  };
  return (
    <>
      <ModalFile
        handleCancel={onCloseModal}
        isModalOpen={modalFile}
        file={file}
        setPage={setPage}
      />
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
        <LinkOutlined
          style={{ fontSize: "30px", color: "#aaa", cursor: "pointer" }}
        />
      </FileUploader>
    </>
  );
};

export default FileUpload;
