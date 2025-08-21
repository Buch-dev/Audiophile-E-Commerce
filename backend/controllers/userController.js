import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import winston from 'winston';
import User from '../models/userModel.js';

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' }),
  ],
});

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required(),
});

// Error handling utility
const handleError = (res, status, message) => {
  return res.status(status).json({ status: 'error', error: message });
};

// Register new user
export const registerUser = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    logger.warn(`Invalid registration attempt: ${JSON.stringify(error.details)}`);
    return handleError(res, 400, error.details.map((err) => err.message));
  }

  const { name, email, password } = value;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Registration attempt with existing email: ${email}`);
      return handleError(res, 400, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: savedUser,
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    handleError(res, 500, 'Server error, please try again later');
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    logger.warn(`Invalid login attempt: ${JSON.stringify(error.details)}`);
    return handleError(res, 400, error.details.map((err) => err.message));
  }

  const { email, password } = value;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn(`Failed login attempt for email: ${email}`);
      return handleError(res, 401, 'Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000,
    });

    user.password = undefined;
    logger.info(`User logged in successfully: ${email}`);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: user,
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    handleError(res, 500, 'Server error, please try again later');
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    if (!user) {
      logger.warn(`User not found: ${req.user.id}`);
      return handleError(res, 404, 'User not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    logger.error(`Profile retrieval error: ${error.message}`);
    handleError(res, 500, 'Server error, please try again later');
  }
};

// Logout user
export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    logger.info(`User logged out: ${req.user?.id || 'unknown'}`);
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged out',
    });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    handleError(res, 500, 'Server error, please try again later');
  }
};