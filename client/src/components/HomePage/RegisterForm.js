/**
 * Imports
 */
// Hooks
import { useState, useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
import { register, clearErrors } from '../../actions/authActions';
// CSS
import styles from './CSS/RegisterForm.module.css';
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
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

/**
 * Register Form
 */
const RegisterForm = ({
  register,
  showModal,
  handleClose,
  clearErrors,
  auth,
}) => {
  // Initialize state
  const [regStart, setRegStart] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
  });
  const [dob, setDob] = useState(null);

  // Destructure user state
  const { name, email, password, gender } = user;

  useEffect(() => {
    // Set state before unmount
    return () => {
      setRegStart(false);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Set state
    setRegStart(false);
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
  const registerForm = async (e) => {
    e.preventDefault();
    // Set state
    setRegStart(true);
    // Data to send
    const data = {
      name,
      email,
      password,
      gender,
      dob,
    };

    // Validation
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      !dob ||
      gender === ''
    ) {
      // Set state
      setRegStart(false);
      // Display error
      alert('Please enter all fields');
    } else if (password.length < 6) {
      // Set state
      setRegStart(false);
      // Display error
      alert('Password must be at least 6 characters');
    } else if (!JSON.stringify(dob)) {
      // Set state
      setRegStart(false);
      // Display error
      alert('Please enter a valid date of birth');
    } else {
      // Register user
      await register(data);
    }
  };

  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: 'clamp(200px, 90%, 27rem)',
    borderRadius: '5px !important',
    boxShadow:
      '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby='reg-title'
        aria-describedby='reg-description'
      >
        <Box sx={style}>
          <Box sx={{ p: 3, pb: 1.5, pt: 1.5 }}>
            <Typography
              id='reg-title'
              variant='h3'
              component='h4'
              sx={{
                fontWeight: '600',
                color: '#1C1E21',
                fontSize: '2rem',
                lineHeight: '2.375rem',
              }}
            >
              Sign Up
            </Typography>
            <Typography
              id='reg-description'
              variant='h6'
              component='h6'
              sx={{
                fontWeight: 'normal',
                color: '#606770',
                fontSize: '0.938rem',
                lineHeight: '1.5rem',
              }}
            >
              It's quick and easy.
            </Typography>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Box sx={{ p: 3, pb: 1.5, pt: 1.5 }}>
            <form onSubmit={registerForm} className={styles.regForm}>
              <TextField
                className={styles.input}
                label='Name'
                id='regName'
                margin='dense'
                value={name}
                name='name'
                onChange={onChange}
              />
              <TextField
                className={styles.input}
                label='Email'
                id='regEmail'
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
                <InputLabel htmlFor='regPassword'>Password</InputLabel>
                <OutlinedInput
                  id='regPassword'
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={styles.dob}>
                  <DatePicker
                    variant='filled'
                    label='Date of Birth'
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
              <FormControl
                fullWidth
                sx={{ textAlign: 'left', marginTop: '0.75rem' }}
              >
                <InputLabel id='regGender-label'>Gender</InputLabel>
                <Select
                  labelId='regGender-label'
                  id='regGender'
                  name='gender'
                  value={gender}
                  label='Gender'
                  onChange={onChange}
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant='contained'
                disableElevation
                className={styles.registerButton}
                disabled={regStart}
                type='submit'
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
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
export default connect(mapStateToProps, { register, clearErrors })(
  RegisterForm
);
