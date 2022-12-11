import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalStack: [],
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.modalStack.push({
        type: payload.type,
        data: {
          ...payload.data,
          id: Date.now(),
        },
      });
    },
    closeModal: (state, { payload }) => {
      state.modalStack = state.modalStack.filter(
        (modal) => modal.data.id !== payload
      );
    },
  },
});

export default modalsSlice;
