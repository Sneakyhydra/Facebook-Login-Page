/**
 * Imports
 */
// Redux
import { combineReducers } from 'redux';
// Reducers
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer, // Auth reducer
});
