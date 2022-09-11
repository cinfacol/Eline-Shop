import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: []
};

const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type
      });
    },
  },
  /* extraReducers: {
    [extraAction]: (state, action) => {
      state.alerts.push({ message: action.error.message, type: "error" });
    } 
  } */
});

export const actions = AlertSlice.actions;

export default AlertSlice;
