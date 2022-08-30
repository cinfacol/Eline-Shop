import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth/users/`;

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

  return axios.post(API_URL, body, config);
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

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
  logout,
  login,
}

export default authService