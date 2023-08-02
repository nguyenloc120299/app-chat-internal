import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StateType {
  messages: any[];
  messUnread: any[]// Replace `any[]` with the actual type of your messages
}
const initialState: StateType = {
  messages: [],
  messUnread: []
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
    setMessagesUnread: (state, action) => {
      return {
        ...state,
        messUnread: [...state.messUnread, action.payload],
      };
    },
    resetMessUnread: (state) => {
      return {
        ...state,
        messUnread: [],
      };
    },
    updateMessages: (state, action) => {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    resetMessages: (state, action) => {
      state.messages = action.payload
    }
  },
});

export const { setMessages, updateMessages, resetMessages, setMessagesUnread, resetMessUnread } = appSlice.actions;

export default appSlice.reducer;
