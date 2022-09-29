import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const get_products = createAsyncThunk(
  'products/get_products',
  async (arg, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await authApi.get(`/api/product/get-products`, config);
      if (res.status === 200) {
        return res.data;
      } else {
        thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.res.message);
      }
    }
  }
)
