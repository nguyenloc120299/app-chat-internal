import { TypeSend } from "api/chat";
import { ROLES } from "./global";

export interface Join_Room { roomId: string; userId: string }
export interface Sender {
    name: string,
    _id: string
}
export interface MESSAGE {
  content: string;
  sender: Sender;
  createdAt: any;
  roomId: string;
  role: ROLES;
  file?: string;
  typeFile?: TypeSend;
}
export interface Leave_Room {
    roomId: string,
    userId: string
}
export interface RoomData {
    nameRoom: string
    avatarRoom: string,
    members: Array<string>
}

export interface Add_Room {
    roomId: string,
    members: Array<string>
}