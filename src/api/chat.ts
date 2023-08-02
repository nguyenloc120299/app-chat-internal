import { PushNotification } from "types/user";
import requestService from "./request";

export enum TypeSend {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  ORDER = "ORDER",
}
export type SendData = {
  content: string;
  room: string;
  file?: string;
  typeFile?: TypeSend;
};
export const getMessages = async (
  roomId: string,
  page: string,
  limit: string
) => {
  const res = await requestService.get(
    `/message/all?roomId=${roomId}&page=${page}&limit=${limit}`
  );
  return res.data;
};

export const sendMess = async (sendData: SendData) => {
  const res = await requestService.post("/message/send", {
    data: sendData,
  });
  return res.data;
};

export const upload = async (formData: any) => {
  const res = await requestService.post("/upload/file", {
    data: formData,
  });
  return res.data;
};

export const pushNotification = async (pushNotification: PushNotification) => {
  const res = await requestService.post("/message/push-notification", {
    data: pushNotification,
  });
  return res.data;
};
