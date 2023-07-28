import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conservation: false,
  socket: null,
  loading:{}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeConservation: (state, action) => {
      state.conservation = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = {
        ...state.loading,
        [action.payload.type]: action.payload.value,
      };
    },
  },
});

export const { changeConservation, setLoading } = appSlice.actions;

export default appSlice.reducer;
