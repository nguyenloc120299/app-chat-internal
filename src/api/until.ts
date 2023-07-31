import axios from "axios";

export const uploadFile = async (file: any) => {
    try {
        console.log("file", file);

        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/upload/file`,
            formData
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};