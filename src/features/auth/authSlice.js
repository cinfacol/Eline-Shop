import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './services/auth.service';
// import { toast } from 'react-toastify';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Signup user
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ first_name, last_name, email, password, re_password }, thunkAPI) => {

    try {

      const response = await authService.signup(first_name, last_name, email, password, re_password);

      if (response.status === 201) {
        return response.data;
      } else {
        return response.data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// Activate user
export const activate = createAsyncThunk(
  'auth/activate',
  async ({ uid, token }, thunkAPI) => {
    try {
      const response = await authService.activate(uid, token);

      if (response.status === 204) {
        thunkAPI.getState();
        return response.data;
      }
    } catch (error) {
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

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAccountCreated: false,
  isActivated: false,
  user: user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null },
  status: 'idle',
  error: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        if (state.status === 'idle') {
          state.status = 'pending'
        }
      })
      .addCase(signup.fulfilled, (state) => {
        if (state.status === 'pending') {
          state.status = 'idle'
          state.isAccountCreated = true;
        }
      })
      .addCase(signup.rejected, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.error = action.error;
          state.isAccountCreated = false;
        }
      })

      .addCase(activate.pending, (state) => {
        if (state.status === 'idle') {
          state.status = 'pending';
        }
      })
      .addCase(activate.fulfilled, (state) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.isActivated = true;
        }
      })
      .addCase(activate.rejected, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle'
          state.error = action.error
          state.isActivated = false;
        }
      })
  },
})

const { reducer } = authSlice;
export default reducer;
