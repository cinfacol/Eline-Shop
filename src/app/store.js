import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { NotificationReducer } from '../features/notifications/notificationSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import productsReducer from '../features/products/productsSlice';

const reducer = {
  auth: authReducer,
  notification: NotificationReducer,
  categories: categoriesReducer,
  products: productsReducer,
}

const store = configureStore({
  reducer,
  devTools: true,
})

export default store;
