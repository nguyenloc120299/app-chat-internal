import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface TYPE_ROOM {
    rooms: Array<any>
    total: number
}
interface StateType {
    rooms: TYPE_ROOM;
}
const initialState: StateType = {
    rooms: {
        rooms: [],
        total: 0
    }
};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload
        }
    },
});

export const {
    setRooms
} = roomSlice.actions;

export default roomSlice.reducer;
