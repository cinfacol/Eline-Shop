import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import AlertSlice from '../features/alert/alertSlice';
// import messageReducer from '../features/message/messageSlice';

const reducer = {
  auth: authReducer,
  activate: authReducer,
  alert: AlertSlice.reducer,
  // message: messageReducer
}

const store = configureStore({
  reducer,
  devTools: true,
})

export default store;
