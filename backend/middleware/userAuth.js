import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  // Middleware for user authentication
  const { token } = req.cookies;

  if (!token) {
    return next(new HandleError("Authentication required"));
  }

  // Verify token (implementation depends on your token strategy)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Attach user info to request
    next();
  } catch (error) {
    next(new HandleError("Invalid token"));
  }
});

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Access denied: ${req.user.role} insufficient permissions`,
          403
        )
      );
    }
    next();
  };
};
