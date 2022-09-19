import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert(state, action) {
      state.push({
        alert: action.payload
      })
    },
    removeAlert(state) {
      state.push({
        alert: null
      })
    }
  },
  /* extraReducers: {
    [extraAction]: (state, action) => {
      state.alerts.push({ message: action.error.message, type: "error" });
    }
  } */
});

export const { reducer } = alertSlice;

export default reducer;
