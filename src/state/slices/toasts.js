import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    showToast: (state, { payload }) => {
      state.toasts.push({
        id: Date.now(),
        type: payload.type,
        message: payload.message,
      });
    },
    hideToast: (state, { payload: toastId }) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== toastId);
    },
  },
});

export default toastsSlice;
