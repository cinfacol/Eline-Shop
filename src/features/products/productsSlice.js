import { createSlice } from '@reduxjs/toolkit';
import { get_products } from '../services/products/products.service';

const initialState = {
  products: {},
  products_arrival: {},
  products_sold: {},
  product: {},
  search_products: {},
  related_products: {},
  filtered_products: {},
  status: 'idle'
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(get_products.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_products.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.products = action.payload.products;
      }
    })
    .addCase(get_products.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        // state.error = action.error.message
      }
    })
  }
})

const { reducer } = productsSlice;
export default reducer;
