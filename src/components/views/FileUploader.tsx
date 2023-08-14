import React from "react";
interface TYPE_PROPS {
  children: React.ReactNode;
  handleChange: (file: any) => void;
  id:string
}
const FileUploader = ({ children, handleChange ,id}: TYPE_PROPS) => {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type={"file"}
        accept=".png,.jpg,.mp4"
        style={{ display: "none" }}
        onChange={(e: any) => {
          const file = e.target.files[0];
          handleChange(file);
        }}
      />
      {children}
    </label>
  );
};

export default FileUploader;
