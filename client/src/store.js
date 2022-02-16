/**
 * Imports
 */
// Redux
import { createStore, applyMiddleware } from 'redux';
// DevTools
import { composeWithDevTools } from 'redux-devtools-extension';
// Middleware
import thunk from 'redux-thunk';
// Root Reducer
import rootReducer from './reducers/index';

/**
 * Initial State
 */
const initialState = {};

/**
 * Middleware
 */
const middleware = [thunk];

/**
 * Initialize Store
 */
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
