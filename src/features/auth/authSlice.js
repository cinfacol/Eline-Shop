import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { setMessage } from '../message/messageSlice';
import authService from './services/auth.service';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Signup user
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ first_name, last_name, email, password, re_password }, thunkAPI) => {
    try {
      const response = await authService.signup(first_name, last_name, email, password, re_password);

      if (response.status === 201) {
        thunkAPI.dispatch(
          // setMessage('Tu cuenta se ha registrada exitosamente, revisa tu email para activarla')
        );
        return response.data;
      } else {
        thunkAPI.dispatch(
          // setMessage('No fue posible registrar tu cuenta')
        );
      }
    } catch (error) {
      // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      // thunkAPI.dispatch(setMessage(message));
      thunkAPI.dispatch();
      console.log('error_response', error.response);
      console.log('error_response_data', error.response.data);
      console.log('error_response_data_message', error.response.data.message);
      console.log('error_response_data_email', error.response.data.email);

      return thunkAPI.rejectWithValue(error.response.data);
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
        thunkAPI.dispatch(
          // setMessage('Tu cuenta ha sido activada exitosamente')
        );
        thunkAPI.getState();
        return response.data;
      } else {
        thunkAPI.dispatch(
          // setMessage('Error activando tu cuenta')
        );
      }
    } catch (error) {
      // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      // thunkAPI.dispatch(setMessage(message));
      thunkAPI.dispatch();

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
  isActivated: false,
  user: user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null },
  status: 'idle',
  error: false
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
          state.isLoggedIn = false;
        }
      })
      .addCase(signup.rejected, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle'
          state.error = action.error
          state.isLoggedIn = false;
        }
      })

      .addCase(activate.pending, (state, action) => {
        if (state.status === 'idle') {
          state.status = 'pending'
        }
      })
      .addCase(activate.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.isActivated = true;
        }
      })
      .addCase(activate.rejected, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle'
          state.error = action.error
          state.isLoggedIn = false;
          state.isActivated = false;
        }
      })
  },
})

const { reducer } = authSlice;
export default reducer;
