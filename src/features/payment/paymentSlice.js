import { createSlice } from '@reduxjs/toolkit';
import { get_payment_total } from '../services/payment/payment.service';

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
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(get_payment_total.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(get_payment_total.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.get_payment_total = action.payload;
    })
    .addCase(get_payment_total.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
    })
  }
})

const { reducer } = paymentSlice;
export default reducer;
