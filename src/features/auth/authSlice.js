import { createSlice } from '@reduxjs/toolkit';
// import authService from './services/auth.service';
import { signup, activate, login } from './services/auth.service';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
/* const access = localStorage.getItem('access');
const refresh = localStorage.getItem('refresh'); */

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
  reducers: {
    logout: (state) => {
      // localStorage.removeItem('user') // delete user from storage
      state.access = '';
      state.refresh = '';
      localStorage.removeItem('access', state.access);
      localStorage.removeItem('refresh', state.refresh);
      state.user.isLoggedIn = false;
      state.status = 'idle';
      state.error = [];
    },
  },
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
      .addCase(login.pending, (state) => {
        if (state.status === 'idle') {
          state.status = 'pending';
        }
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.user.isLoggedIn = true;
          state.access = localStorage.getItem('access');
          state.refresh = localStorage.getItem('refresh');

        }
      })
      .addCase(login.rejected, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle'
          state.error = action.error
          state.isLoggedIn = false;
        }
      })
  },
})

export const { logout } = authSlice.actions
const { reducer } = authSlice;
export default reducer;
