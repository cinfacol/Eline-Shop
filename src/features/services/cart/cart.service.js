import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const add_item = createAsyncThunk(
  'cart/add_item',
  async ({ product }, thunkAPI) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };

      const product_id = product.id;

      const body = JSON.stringify({ product_id });
      try {
        const res = await authApi.post(`/api/cart/add-item`, body, config);
        if (res.status === 201) {
          return res.data;
        } else {
          thunkAPI.dispatch(Error);
        }
      } catch (error) {
        if (error.response.data) {
          return thunkAPI.rejectWithValue(error.response.data);
        } else {
          return thunkAPI.rejectWithValue(error.message);
        }
      }

    } else {
      let cart = [];
      console.log('cart', cart);
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      let shouldAddItem = true;

      // eslint-disable-next-line array-callback-return
      cart.map(item => {
        if (product.id.toString() === item.product.id.toString()) {
          shouldAddItem = false;
        }
      });

      const order_item = {
        product: product,
        count: 1
      };

      if (shouldAddItem) {
        cart.push(order_item);
      }

      return cart;
    }
  }
)
