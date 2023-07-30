import { ROLES } from "types/global";
import requestService from "./request";
import { exitCode } from "process";
import { Add_Room, RoomData } from "types/joinRoom";


export const getAll = async (role: ROLES) => {
    let res
    if (ROLES.ADMIN === role)
        res = await requestService.get("/room/get-all")
    else
        res = await requestService.get('/room-user/get-room')
    return res.data
}

export const readMess = async ({ room }: any) => {
    const res = await requestService.post('/room-user/read-mess', {
        data: { room }
    })
    return res.data
}

export const create = async (roomData: RoomData) => {
    const res = await requestService.post('/room/create', {
        data: roomData
    })
    return res.data
}

export const addMembers = async (addRoom: Add_Room) => {
    const res = await requestService.post('/room/add-members', {
        data: addRoom
    })
    return res.data
}