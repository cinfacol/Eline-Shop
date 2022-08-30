import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message/messageSlice';
import authService from '../../services/auth.service';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null
}

// Register user
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ first_name, last_name, email, password, re_password }, thunkAPI) => {
    try {
      const response = await authService.signup(first_name, last_name, email, password, re_password);

      if (response.status === 201) {
        thunkAPI.dispatch(
          setMessage('Tu cuenta se ha registrada exitosamente, revisa tu email para activarla')
        );
        return response.data;
      }

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signup.fulfilled]: (state) => {
      state.isLoggedIn = false;
      console.log('estado', state.isLoggedIn);
    },
    [signup.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
})

export const { reducer } = authSlice;
export default reducer;