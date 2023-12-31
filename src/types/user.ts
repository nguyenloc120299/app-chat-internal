import { ROLES } from "./global";

export interface UPDATE_USER {
  name?: string;
  profilePicUrl?: string;
  linkFaceBook?: string;
  linkTelegram?: string;
  tokenFireBase?: string;
}

export interface PushNotification {
  titleNotification: string;
  bodyNotification: string;
  userId: string;
  room: string,
  role: ROLES
}