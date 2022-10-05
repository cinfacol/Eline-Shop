import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { NotificationReducer } from '../features/notifications/notificationSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import productsReducer from '../features/products/productsSlice';
import arrivalReducer from '../features/products/arrivalSlice';
import soldReducer from '../features/products/soldSlice';
import relatedReducer from '../features/products/relatedSlice';

const reducer = {
  auth: authReducer,
  notification: NotificationReducer,
  categories: categoriesReducer,
  products: productsReducer,
  arrival: arrivalReducer,
  sold: soldReducer,
  related: relatedReducer,
}

const store = configureStore({
  reducer,
  devTools: true,
})

export default store;
