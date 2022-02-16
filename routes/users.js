/**
 * Imports
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * Initialize router
 */
const router = express.Router();

/** Endpoints **\
 * Register a user
 */

/**
 * @route POST api/users
 * @desc Register a user
 * @access Public
 */
router.post(
  '/',
  [
    // Validate input
    check('name', 'Please enter name').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('dob', 'Please enter date of birth').notEmpty(),
    check('gender', 'Please enter gender').notEmpty(),
  ],
  async (req, res) => {
    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    // Destructure request body
    const { name, email, password, dob, gender } = req.body;

    try {
      // Find user by email
      let user = await User.findOne({ email });

      // If user already exists
      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'User already exists' }] });
      }

      // Remove time from dob
      const newDob = dob.slice(0, 10);

      // Create a new user
      user = new User({
        name,
        email,
        password,
        dob: newDob,
        gender,
      });

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user in the database
      await user.save();

      // Payload for JWT
      const payload = {
        id: user.id,
      };

      // Sign JWT
      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 21600,
      });

      // Create an httpOnly cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        secure: false,
        maxAge: 6 * 60 * 60 * 1000,
      });

      // Send success message to client
      return res.send('Registered');
    } catch (err) {
      // Return error
      return res.status(500).send({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
