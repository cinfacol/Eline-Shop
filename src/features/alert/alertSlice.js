import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return {
        alert: action.payload
      };
    },
    removeAlert: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = alertSlice;

export const { setAlert, removeAlert } = actions;
export default reducer;
