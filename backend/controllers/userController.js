import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import HandleError from "../utils/handleError.js";

// Register new user
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  let token = null;
  if (typeof newUser.getJwtToken === "function") {
    token = newUser.getJwtToken();
  }
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    // next must be in the function signature
    throw error;
  }
});

// Login user
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or Password cannot be empty", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    return next(new HandleError("Invalid email or password", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({ message: "Login successful", user, token });
});

// Get user profile
export const getUserProfile = handleAsyncError(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "successfully logged out",
  });
};
