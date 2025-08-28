import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";

// Register new user
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return next(
      new HandleError("Please provide name, email, and password", 400)
    );
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return next(new HandleError("User already exists with this email", 400));
  }

  // Create new user (password will be hashed by the pre-save middleware)
  const newUser = new User({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password, // Don't hash here - let the middleware do it
  });

  try {
    const savedUser = await newUser.save();

    sendToken(savedUser, 201, res);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return next(new HandleError("Email already exists", 400));
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return next(new HandleError(message, 400));
    }

    return next(new HandleError("Registration failed", 500));
  }
});

// Login user
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new HandleError("Please provide email and password", 400));
  }

  // Find user and include password field
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }

  // Check if account is locked
  if (user.isLocked) {
    const lockTimeRemaining = Math.ceil(
      (user.lockoutUntil - Date.now()) / 1000 / 60
    );
    return next(
      new HandleError(
        `Account locked. Try again in ${lockTimeRemaining} minutes`,
        423
      )
    );
  }

  // Verify password
  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    // Increment login attempts
    await user.incrementLoginAttempts();
    return next(new HandleError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Get user profile
export const getUserProfile = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout user
export const logoutUser = handleAsyncError(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expire: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});

// Debug endpoint to check password hashing (remove in production)
export const debugPassword = handleAsyncError(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValid = await user.verifyPassword(password);

  res.json({
    email,
    passwordLength: user.password.length,
    isValidPassword: isValid,
    providedPassword: password,
    hashedPassword: user.password.substring(0, 10) + "...", // Only show first 10 chars
  });
});
