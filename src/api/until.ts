import axios from "axios";
export enum TYPEFILE {
    AVATAR = "AVATAR",
    MESSAGE = "MESSAGE",
}
export const uploadFile = async (file: any, type: TYPEFILE) => {
    try {

        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/upload/file?type=${type}`,
            formData
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};