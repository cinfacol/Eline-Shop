import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import alertReducer from '../features/alert/alertSlice';
import messageReducer from '../features/message/messageSlice';

const reducer = {
  auth: authReducer,
  activate: authReducer,
  alert: alertReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
