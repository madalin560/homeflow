import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screens: [],
};

const screensSlice = createSlice({
  name: "screens",
  initialState,
  reducers: {
    openScreen: (state, { payload }) => {
      state.screens.push({
        ...payload,
        id: Date.now(),
      });
    },
    closeScreen: (state, { payload }) => {
      state.screens = state.screens.filter((screen) => screen.id !== payload);
    },
  },
});

export default screensSlice;
