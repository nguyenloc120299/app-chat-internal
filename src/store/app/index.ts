import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conservation: false,
  socket: null,
  loading: {},
  isCallBack: {},
  
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeConservation: (state, action) => {
      state.conservation = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload
    },
    setLoading: (state, action) => {
      state.loading = {
        ...state.loading,
        [action.payload.type]: action.payload.value,
      };
    },
    setCallback: (state, action) => {
      state.isCallBack = {
        ...state.isCallBack,
        [action.payload.type]: action.payload.value,
      };
    },
  },
});

export const { changeConservation, setLoading, setSocket, setCallback } = appSlice.actions;

export default appSlice.reducer;
