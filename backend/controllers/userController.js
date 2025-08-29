import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// Register new user
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return next(
      new HandleError("Please provide name, email, and password", 400)
    );
  }

  // Additional validation
  if (name.trim().length < 2) {
    return next(new HandleError("Name must be at least 2 characters long", 400));
  }

  if (password.length < 8) {
    return next(new HandleError("Password must be at least 8 characters long", 400));
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new HandleError("Please provide a valid email address", 400));
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

  // Remove the try-catch since handleAsyncError handles errors
  const savedUser = await newUser.save();
  
  // Send token response
  sendToken(savedUser, 201, res);
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

  // Check if account is locked (if you have this feature)
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
    // Increment login attempts if you have this feature
    if (user.incrementLoginAttempts) {
      await user.incrementLoginAttempts();
    }
    return next(new HandleError("Invalid email or password", 401));
  }

  // Reset login attempts on successful login if you have this feature
  if (user.resetLoginAttempts) {
    await user.resetLoginAttempts();
  }

  // Send token response
  sendToken(user, 200, res);
});

// Get user profile
export const getUserProfile = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  return res.status(200).json({
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
    expires: new Date(Date.now()), // Fixed: was 'expire', should be 'expires'
  });

  return res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});

// Request Password Reset
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;

  // Input validation
  if (!email) {
    return next(new HandleError("Please provide email address", 400));
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(new HandleError("User not found with this email", 404));
  }

  // Generate password reset token
  const resetToken = user.getResetPasswordToken();

  // Save user with reset token (don't validate other fields)
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  
  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it and your password will remain unchanged.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Token",
      message,
    });

    return res.status(200).json({
      success: true,
      message: `Password reset link sent to ${user.email} successfully`,
    });
  } catch (error) {
    // Clear reset token fields if email sending fails
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    
    return next(new HandleError("Error sending email. Please try again later.", 500));
  }
});

// Reset Password
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  // Input validation
  if (!password || !confirmPassword) {
    return next(new HandleError("Please provide password and confirm password", 400));
  }

  if (password !== confirmPassword) {
    return next(new HandleError("Passwords do not match", 400));
  }

  if (password.length < 8) {
    return next(new HandleError("Password must be at least 8 characters long", 400));
  }

  // Hash the token to compare with stored hashed token
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user with valid reset token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new HandleError("Password reset token is invalid or has expired", 400));
  }

  // Set new password (will be hashed by pre-save middleware)
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // Send token response
  sendToken(user, 200, res);
});

// Change Password (for authenticated users)
export const changePassword = handleAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Input validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new HandleError("Please provide current password, new password, and confirm password", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new HandleError("New passwords do not match", 400));
  }

  if (newPassword.length < 8) {
    return next(new HandleError("New password must be at least 8 characters long", 400));
  }

  // Get user with password field
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  // Verify current password
  const isCurrentPasswordValid = await user.verifyPassword(currentPassword);

  if (!isCurrentPasswordValid) {
    return next(new HandleError("Current password is incorrect", 401));
  }

  // Set new password (will be hashed by pre-save middleware)
  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// Update User Profile
export const updateProfile = handleAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  // Build update object with only provided fields
  const updateData = {};
  
  if (name) {
    if (name.trim().length < 2) {
      return next(new HandleError("Name must be at least 2 characters long", 400));
    }
    updateData.name = name.trim();
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new HandleError("Please provide a valid email address", 400));
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email.toLowerCase(),
      _id: { $ne: userId }
    });

    if (existingUser) {
      return next(new HandleError("Email is already in use", 400));
    }

    updateData.email = email.toLowerCase().trim();
  }

  // Update user
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// Delete User Account
export const deleteAccount = handleAsyncError(async (req, res, next) => {
  const { password } = req.body;
  const userId = req.user.id;

  // Input validation
  if (!password) {
    return next(new HandleError("Please provide your password to delete account", 400));
  }

  // Get user with password field
  const user = await User.findById(userId).select("+password");

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  // Verify password
  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    return next(new HandleError("Invalid password", 401));
  }

  // Delete user account
  await User.findByIdAndDelete(userId);

  // Clear cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now()),
  });

  return res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

// Get All Users (Admin only)
export const getAllUsers = handleAsyncError(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// Get Single User (Admin only)
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(req.params.id);
  

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role (Admin only)
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const userId = req.params.id;

  // Validate role
  if (!role || !['user', 'admin'].includes(role)) {
    return next(new HandleError("Please provide a valid role (user or admin)", 400));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user,
  });
});

// Delete User (Admin only)
export const deleteUser = handleAsyncError(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
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

  return res.json({
    email,
    passwordLength: user.password.length,
    isValidPassword: isValid,
    providedPassword: password,
    hashedPassword: user.password.substring(0, 10) + "...", // Only show first 10 chars
  });
});