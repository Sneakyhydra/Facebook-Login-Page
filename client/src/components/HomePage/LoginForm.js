/**
 * Imports
 */
// Hooks
import { useState, useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';
// CSS
import styles from './CSS/LoginForm.module.css';
// Material UI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

/**
 * Login Form
 */
const LoginForm = ({ auth, login, clearErrors, handleOpen, showModal }) => {
  // Initialize state
  const [logStart, setLogStart] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Destructure logUser state
  const { email, password } = user;

  useEffect(() => {
    // Set state before unmount
    return () => {
      setLogStart(false);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Set state
    setLogStart(false);
    // Clear errors
    clearErrors();

    // eslint-disable-next-line
  }, [auth.error]);

  // Handle Password Show/Hide
  const showPasswordHandler = () => {
    const updateShowPassword = (prevState) => {
      return !prevState;
    };

    setShowPass(updateShowPassword(showPass));
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Handle input change
  const onChange = (e) => {
    const updateUser = (prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    };

    setUser(updateUser(user));
  };

  // Handle form submit
  const loginForm = async (e) => {
    e.preventDefault();
    // Set state
    setLogStart(true);
    // Data to send
    const data = {
      email,
      password,
    };

    // Validation
    if (email === '' || password === '') {
      // Set state
      setLogStart(false);
      alert('Please fill in all fields');
    } else {
      // Login user
      await login(data);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          flexDirection: 'column',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className={styles.container}
      >
        <form onSubmit={loginForm}>
          <TextField
            className={styles.input}
            label='Email'
            id='logEmail'
            margin='dense'
            value={email}
            name='email'
            onChange={onChange}
          />
          <FormControl
            className={styles.input}
            variant='outlined'
            margin='dense'
          >
            <InputLabel htmlFor='logPassword'>Password</InputLabel>
            <OutlinedInput
              id='logPassword'
              name='password'
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={onChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={showPasswordHandler}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <Button
            variant='contained'
            disableElevation
            className={styles.loginButton}
            disabled={logStart || showModal}
            type='submit'
          >
            Log In
          </Button>
        </form>
        <Divider variant='middle' />
        <Button
          variant='contained'
          disableElevation
          className={styles.newAccountButton}
          disabled={logStart || showModal}
          onClick={handleOpen}
        >
          Create New Account
        </Button>
      </Box>
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
export default connect(mapStateToProps, { login, clearErrors })(LoginForm);
