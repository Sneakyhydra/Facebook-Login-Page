/**
 * Imports
 */
// Types
import * as actions from '../actions/types';

/**
 * Initial State
 */
const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

/**
 * Handle Actions
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS:
    case actions.VALID_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case actions.LOGIN_FAIL:
    case actions.AUTH_ERROR:
    case actions.REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };

    case actions.USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case actions.LOGOUT:
    case actions.VALID_FAIL:
      return {
        ...state,
        user: null,
        error: null,
        isAuthenticated: false,
      };

    case actions.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
