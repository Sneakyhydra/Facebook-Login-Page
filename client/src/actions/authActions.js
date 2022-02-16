/**
 * Imports
 */
// Types
import * as actions from './types';
// Axios
import axios from 'axios';
axios.defaults.withCredentials = true;

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    // GET localhost:5000/api/auth
    const res = await axios.get('/api/auth');

    // Dispatch USER_LOADED
    dispatch({ type: actions.USER_LOADED, payload: res.data });
  } catch (err) {
    if (err.response.status === 401) {
      console.log('This is the desired behaviour');
    }
    // Dispatch AUTH_ERROR
    dispatch({ type: actions.AUTH_ERROR, payload: err.response.data });
  }
};

// Login
export const login = (formData) => async (dispatch) => {
  try {
    // Config for axios
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // POST localhost:5000/api/auth
    await axios.post('api/auth', formData, config);

    // Dispatch LOGIN_SUCCESS
    dispatch({
      type: actions.LOGIN_SUCCESS,
    });
  } catch (err) {
    // Dispatch LOGIN_FAIL
    dispatch({
      type: actions.LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

// Register
export const register = (formData) => async (dispatch) => {
  try {
    // Config for axios
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // POST localhost:5000/api/users
    const res = await axios.post('api/users', formData, config);

    // Dispatch REGISTER_SUCCESS
    dispatch({
      type: actions.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // Dispatch REGISTER_FAIL
    dispatch({
      type: actions.REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    // DELETE localhost:5000/api/auth
    await axios.delete('/api/auth');

    // Dispatch LOGOUT
    dispatch({ type: actions.LOGOUT });
  } catch (err) {
    // Console log error
    console.log(err);
  }
};

// Validate user
export const validate = () => async (dispatch) => {
  try {
    // GET localhost:5000/api/auth/check
    const res = await axios.get('/api/auth/check');

    // If Validate is successful
    if (res.data === 'Valid') {
      // Dispatch VALID_SUCCESS
      dispatch({
        type: actions.VALID_SUCCESS,
      });
    }
  } catch (err) {
    // Dispatch VALID_FAIL
    dispatch({
      type: actions.VALID_FAIL,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  // Dispatch CLEAR_ERRORS
  dispatch({
    type: actions.CLEAR_ERRORS,
  });
};
