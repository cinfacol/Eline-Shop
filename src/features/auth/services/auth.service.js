import axios from 'axios';

const API_SIGNUP_URL = `${process.env.REACT_APP_API_URL}/auth/users/`;
const API_ACTIVATE_URL = `${process.env.REACT_APP_API_URL}/auth/users/activation/`;
const API_LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/users/`;

const signup = (first_name, last_name, email, password, re_password) => {
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

  return axios.post(API_SIGNUP_URL, body, config);
}

const activate = (uid, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    uid,
    token
  });

  return axios.post(API_ACTIVATE_URL, body, config);
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_LOGIN_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  signup,
  activate,
  logout,
  login,
}

export default authService
