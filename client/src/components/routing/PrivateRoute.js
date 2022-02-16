/**
 * Imports
 */
// Routing
import { Navigate } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';

/**
 * Private Route
 */
const PrivateRoute = ({ children, auth }) => {
  // Destructure auth from props
  const { isAuthenticated, loading } = auth;

  // If user is authenticated, render children
  return isAuthenticated && !loading ? children : <Navigate to='/' />;
};

// Map state to props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

// Map dispatch to props
export default connect(mapStateToProps, {})(PrivateRoute);
