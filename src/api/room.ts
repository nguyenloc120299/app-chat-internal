import { ROLES } from "types/global";
import requestService from "./request";
import { exitCode } from "process";
import { Add_Room, RoomData, Update_Room } from "types/joinRoom";


export const getAll = async (role: ROLES, page: number, search?: string) => {

    let query = ''
    if (!!search) query = "&search=" + search
    let res
    if (ROLES.ADMIN === role) {
        res = await requestService.get("/room/get-all?page=" + page + "&limit=10" + query)
    }
    else
        res = await requestService.get('/room-user/get-room?page=' + page + "&limit=10" + query)
    return res.data
}

export const readMess = async ({ room }: any) => {
    const res = await requestService.post('/room-user/read-mess', {
        data: { room }
    })
    return res.data
}

export const create = async (roomData: RoomData) => {
    const res = await requestService.post("/room-manager/create", {
      data: roomData,
    });
    return res.data
}

export const addMembers = async (addRoom: Add_Room) => {
    const res = await requestService.post("/room-manager/add-members", {
      data: addRoom,
    });
    return res.data
}

export const updateMember = async (updateRoom: Update_Room) => {
    const res = await requestService.post('/room/update-room', {
        data: updateRoom
    })
    return res.data
}

export const deleteRoom = async (room: string) => {
    const res = await requestService.post('/room/delete', {
        data: { room }
    })
    return res.data
}