import { createSlice } from '@reduxjs/toolkit';
import {
  get_products,
  get_products_by_arrival,
  get_search_products,
  get_filtered_products,
  get_related_products,
  get_product,
  get_products_by_sold,
} from '../services/products/products.service';

const initialState = {
  products: null,
  products_arrival: null,
  search_products: null,
  products_sold: null,
  product: null,
  related_products: null,
  filtered_products: null,
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
    .addCase(get_products_by_arrival.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_products_by_arrival.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.products_arrival = action.payload.products;
      }
    })
    .addCase(get_products_by_arrival.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        // state.error = action.error.message
      }
    })
    .addCase(get_search_products.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_search_products.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.search_products = action.payload.products;
      }
    })
    .addCase(get_search_products.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        // state.error = action.error.message
      }
    })
    .addCase(get_filtered_products.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_filtered_products.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.filtered_products = action.payload.products;
      }
    })
    .addCase(get_filtered_products.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        // state.error = action.error.message
      }
    })
    .addCase(get_related_products.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_related_products.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.related_products = action.payload.products;
      }
    })
    .addCase(get_related_products.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        // state.error = action.error.message
      }
    })
    .addCase(get_product.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_product.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.product = action.payload.products;
      }
    })
    .addCase(get_product.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        // state.error = action.error.message
      }
    })
    .addCase(get_products_by_sold.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    })
    .addCase(get_products_by_sold.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.products_sold = action.payload.products;
      }
    })
    .addCase(get_products_by_sold.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        // state.error = action.error.message
      }
    })
  }
})

const { reducer } = productsSlice;
export default reducer;
