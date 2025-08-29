import express from "express";
import {
  changePassword,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updateProfile,
} from "../controllers/userController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Import user controller functions
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/reset").post(requestPasswordReset);
router.route("/password/reset/:token").post(resetPassword);
router.route("/password/change").post(verifyUserAuth, changePassword);
router.route("/profile").get(verifyUserAuth, getUserProfile);
router.route("/profile/update").put(verifyUserAuth, updateProfile);

export default router;
