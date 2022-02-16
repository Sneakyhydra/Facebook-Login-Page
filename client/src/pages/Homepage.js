/**
 * Imports
 */
// Hooks
import { useEffect, useState, Suspense, lazy } from 'react';
// Routing
import { useNavigate } from 'react-router';
// Components
import LoginForm from '../components/HomePage/LoginForm';
// Redux
import { connect } from 'react-redux';
import { validate, clearErrors } from '../actions/authActions';
// CSS
import styles from './CSS/Homepage.module.css';
// Lazy Components
const RegisterForm = lazy(() => import('../components/HomePage/RegisterForm'));

/**
 * Homepage
 */
const Homepage = ({ auth, validate, clearErrors }) => {
  // Destructure auth from props
  const { isAuthenticated, error } = auth;
  // Initialize navigate
  const navigate = useNavigate();
  // Initialize state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Change body background color on mount
    document.body.style = 'background-color: #f0f2f5;';
    // Validate user on mount
    validate();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    // If error is not null, display error
    if (error) {
      if (error.errors.length > 0) {
        alert(error.errors[0].msg);
      }
    }
    // Clear errors
    clearErrors();

    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <div className={styles.branding}>
        <img
          className={styles.brandLogo}
          src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'
          alt='Facebook'
        />
        <h2 className={styles.brandText}>
          Facebook helps you connect and share with people.
        </h2>
      </div>
      <div className={styles.loginForm}>
        <LoginForm handleOpen={handleOpen} showModal={showModal} />
      </div>
      <Suspense>
        <RegisterForm showModal={showModal} handleClose={handleClose} />
      </Suspense>
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
export default connect(mapStateToProps, { validate, clearErrors })(Homepage);
