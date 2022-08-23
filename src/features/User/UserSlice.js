import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null,
  loading: false
}

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
  dispatch({
    // type: SET_AUTH_LOADING
    type: [signup.pending]
  });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password
  });
  console.log(body);

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

    if (res.status === 201) {
      console.log('data', res.data);
      dispatch({
        // type: SIGNUP_SUCCESS,
        type: [signup.fulfilled],
        payload: res.data
      });
      // dispatch(setAlert('Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam', 'green'))
    } else {
      dispatch({
        // type: SIGNUP_FAIL

        type: [signup.rejected]
      });
      // dispatch(setAlert('Error al crear cuenta', 'red'));
    }
    /* dispatch({
      type: REMOVE_AUTH_LOADING
    }); */
  } catch (err) {
    dispatch({
      // type: SIGNUP_FAIL
      type: [signup.rejected]
    });
    /* dispatch({
      type: REMOVE_AUTH_LOADING
    }); */
    // dispatch(setAlert('Error conectando con el servidor, intenta mas tarde.', 'red'));
  }
};


/* export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ first_name, last_name, email, password, re_password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
 
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
 
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password,
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);
 
      if (response.status === 200) {
        localStorage.setItem('token', data.token)
        return { ...data, first_name: first_name, last_name: last_name, email: email }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
); */

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;

      return state;
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.loading = false;
      state.success = true;
      state.email = payload.user.email;
      state.first_name = payload.user.first_name;
      state.last_name = payload.user.last_name;
    },

    [signup.pending]: (state) => {
      state.loading = true;
    },

    [signup.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload.message;
    }
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = state => state.user