/**
 * Imports
 */
// Hooks
import { useEffect } from 'react';
// Routing
import { useNavigate } from 'react-router';
// Redux
import { connect } from 'react-redux';
import { logout, validate, loadUser } from '../actions/authActions';
// Components
// CSS
import styles from './CSS/Dashboard.module.css';

/**
 * Dashboard
 */
const Dashboard = ({ auth, logout, validate, loadUser }) => {
  // Destructure auth from props
  const { isAuthenticated, user } = auth;
  // Initialize navigate
  const navigate = useNavigate();
  // Initialize state

  useEffect(() => {
    // Validate user
    validate();
    // Load user
    loadUser();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
      navigate('/');
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  // Handle logout
  const handleLogout = async () => await logout();

  // If user not loaded, show nothing
  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Map state to props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

// Map dispatch to props
export default connect(mapStateToProps, { logout, validate, loadUser })(
  Dashboard
);
