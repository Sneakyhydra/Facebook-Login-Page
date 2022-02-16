/**
 * Imports
 */
// Hooks
import { lazy, Suspense, Fragment } from 'react';
// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
// CSS
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
// Lazy Components
const Homepage = lazy(() => import('./pages/Homepage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

/**
 * App
 */
const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route
              exact
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </Fragment>
  );
};

export default App;
