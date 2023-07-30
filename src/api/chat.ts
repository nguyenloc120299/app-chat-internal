import requestService from "./request"
export type SendData = {
    content: string,
    room: string
}
export const getMessages = async (roomId: string, page: string, limit: string) => {
    const res = await requestService.get(`/message/all?roomId=${roomId}&page=${page}&limit=${limit}`)
    return res.data
}

export const sendMess = async (sendData: SendData) => {
    const res = await requestService.post('/message/send', {
        data: sendData
    })
    return res.data
}