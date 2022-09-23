import { createSlice } from '@reduxjs/toolkit';
// import authService from './services/auth.service';
import { signup, activate, login, loadUser, refrescar } from './services/auth.service';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

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
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      state.access = null;
      state.refresh = null;
      state.user.user = null;
      state.user.isLoggedIn = false;
      state.isActivated = false;
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
          state.status = 'idle';
          state.error = action.error;
          state.user.isLoggedIn = false;
        }
      })
      .addCase(loadUser.pending, (state) => {
        if (state.status === 'idle') {
          state.status = 'pending';
        }
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.user.user = action.payload;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.error = action.error;
          state.user.user = {};
        }
      })
      .addCase(refrescar.pending, (state) => {
        if (state.status === 'idle') {
          state.status = 'pending';
        }
      })
      .addCase(refrescar.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.access = action.payload;
        }
      })
      .addCase(refrescar.rejected, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.error = action.error;
          state.user.user = {};
        }
      })
  },
})

export const { logout } = authSlice.actions
const { reducer } = authSlice;
export default reducer;
