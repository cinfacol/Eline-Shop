import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { NotificationReducer } from '../features/notifications/notificationSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

const reducer = {
  auth: authReducer,
  notification: NotificationReducer,
  categories: categoriesReducer
}

const store = configureStore({
  reducer,
  devTools: true,
})

export default store;
