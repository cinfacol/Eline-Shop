import { createSlice } from '@reduxjs/toolkit';
import {
  add_item,
} from '../services/cart/cart.service';

const initialState = {
  items: null,
  amount: 0.00,
  compare_amount: 0.00,
  total_items: 0,
  status: 'idle'
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(add_item.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(add_item.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.add_item = action.payload;
      }
    })
    .addCase(add_item.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.payload;
      }
    })
  }
})

const { reducer } = cartSlice;
export default reducer;
