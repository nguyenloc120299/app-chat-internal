import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StateType {
  messages: any[]; // Replace `any[]` with the actual type of your messages
}
const initialState: StateType = {
  messages: [],
};

const appSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    },
    updateMessages: (state, action) => {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    resetMessages: (state, action) => {
        state.messages=action.payload
    }
  },
});

export const { setMessages, updateMessages, resetMessages } = appSlice.actions;

export default appSlice.reducer;
