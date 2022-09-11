import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: ''
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      if (action.payload.status === 403) {
        return { message: 'La cuenta ya ha sido activada o el enlace ha expirado' };
      }
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;