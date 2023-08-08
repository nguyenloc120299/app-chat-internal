import { DataContext } from "context/globalSocket";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { Join_Room, Leave_Room, MESSAGE } from "types/joinRoom";

export const useSocket = () => {
  const context = useContext(DataContext);

  const { socket } = context;

  const handleEscapeRoom = (data: Join_Room) => {
    socket.emit("escapeRoom", data);
  };

  const handleJoinRoom = (data: Join_Room) => {
    socket.emit("joinRoom", data);
  };
  const handleLeaveRoom = (data: Leave_Room) => {
    socket.emit("leaveRoom", data);
  };
  const handleSendMessage = (data: MESSAGE) => {
    socket.emit("sendMessage", data);
  };

  const handleRemoveRoom = (roomId: string) => {
    socket.emit("removeRoom", { roomId });
  };
  const handleAddRoom = (room: any) => {
    socket.emit("addRoom", room);
  };

  return {
    handleJoinRoom,
    handleEscapeRoom,
    handleSendMessage,
    handleLeaveRoom,
    handleRemoveRoom,
    handleAddRoom,
  };
};
