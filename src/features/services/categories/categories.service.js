import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../auth/authApi';

export const get_categories = createAsyncThunk(
  'categories/get_categories',
  async (thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await authApi.get(`/api/category/categories`, config);
      if (res.status === 200) {
        console.log('categories.data', res.data);
        return res.data;
      } else {
        thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
)
