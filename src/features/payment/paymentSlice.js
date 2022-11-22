import { createSlice } from '@reduxjs/toolkit';
import { get_payment_total, get_client_token, process_payment } from '../services/payment/payment.service';

const initialState = {
  clientToken: null,
  made_payment: false,
  original_price: 0.0,
  total_after_coupon: 0.0,
  total_amount: 0.0,
  total_compare_amount: 0.0,
  estimated_tax: 0.0,
  shipping_cost: 0.0,
  loading: false
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    reset: (state) => {
      state.clientToken = null;
      state.made_payment = false;
      state.original_price = 0.0;
      state.total_after_coupon = 0.0;
      state.total_amount = 0.0;
      state.total_compare_amount = 0.0;
      state.estimated_tax = 0.0;
      state.shipping_cost = 0.0;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(get_payment_total.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_payment_total.fulfilled, (state, action) => {
        state.status = 'idle';
        state.original_price = action.payload.original_price;
        state.total_after_coupon = action.payload.total_after_coupon;
        state.total_amount = action.payload.total_amount;
        state.total_compare_amount = action.payload.total_compare_amount;
        state.estimated_tax = action.payload.estimated_tax;
        state.shipping_cost = action.payload.shipping_cost;
    })
    .addCase(get_payment_total.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })

    .addCase(get_client_token.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_client_token.fulfilled, (state, action) => {
        state.status = 'idle';
        state.clientToken = action.payload.braintree_token;
    })
    .addCase(get_client_token.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })

    .addCase(process_payment.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(process_payment.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.clientToken = action.payload.braintree_token;
    })
    .addCase(process_payment.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })
  }
})

const { reducer } = paymentSlice;
export default reducer;
