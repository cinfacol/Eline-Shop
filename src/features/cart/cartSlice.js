import { createSlice } from '@reduxjs/toolkit';
import {
  add_item,
  get_items,
  get_total,
  get_item_total,
  update_item,
  remove_item,
  empty_cart,
  synch_cart
} from '../services/cart/cart.service';

const initialState = {
  items: [],
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
    .addCase(get_items.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_items.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.items = action.payload.cart;
        console.log('get_items', state.get_items);
      }
    })
    .addCase(get_items.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message;
        console.log('state_error', state.error);
      }
    })
    .addCase(get_total.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_total.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.get_total = action.payload;
      }
    })
    .addCase(get_total.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message;
      }
    })
    .addCase(get_item_total.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_item_total.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.get_item_total = action.payload;
      }
    })
    .addCase(get_item_total.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message;
      }
    })
    .addCase(update_item.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(update_item.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.update_item = action.payload;
      }
    })
    .addCase(update_item.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error.message;
      }
    })
    .addCase(remove_item.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(remove_item.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.remove_item = action.payload;
      }
    })
    .addCase(remove_item.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.payload;
      }
    })
    .addCase(empty_cart.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(empty_cart.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.empty_cart = action.payload;
      }
    })
    .addCase(empty_cart.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.payload;
      }
    })
    .addCase(synch_cart.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(synch_cart.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.synch_cart = action.payload;
      }
    })
    .addCase(synch_cart.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.payload;
      }
    })
  }
})

const { reducer } = cartSlice;
export default reducer;
