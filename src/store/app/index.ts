import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conservation: false,
  socket: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeConservation: (state, action) => {
      state.conservation = action.payload;
    },
  },
});

export const { changeConservation } = appSlice.actions;

export default appSlice.reducer;
