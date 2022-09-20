import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_SIGNUP_URL = `${process.env.REACT_APP_API_URL}/auth/users/`;
const API_ACTIVATE_URL = `${process.env.REACT_APP_API_URL}/auth/users/activation/`;
const API_LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/jwt/create/`;

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ first_name, last_name, email, password, re_password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(API_SIGNUP_URL, {first_name, last_name, email, password, re_password}, config);

      if (response.status === 201) {
        return response.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.response.data.email) {
        // console.log('catch_error_email', error.response.data.email[0]);
        return thunkAPI.rejectWithValue(error.response.data.email[0]);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const activate = createAsyncThunk(
  'auth/activate',
  async ({ uid, token }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(API_ACTIVATE_URL, { uid, token }, config);

      if (response.status === 204) {
        // thunkAPI.getState();
        return response.data;
      }
    } catch (error) {
      // console.log('error_response_data_detail', error.response.data.detail);
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(API_LOGIN_URL, { email, password }, config);

      if (response.status === 200) {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);

        return (response.data);

      }
    } catch (error) {
      if (error.response) {
        console.log('catch_error_response_data_detail', error.response.data.detail);
        return thunkAPI.rejectWithValue(error.response.data.detail);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
