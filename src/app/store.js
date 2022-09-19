import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { NotificationReducer } from '../features/notifications/notificationSlice';

const reducer = {
  auth: authReducer,
  // activate: authReducer,
  notification: NotificationReducer
}

const store = configureStore({
  reducer,
  devTools: true,
})

export default store;
