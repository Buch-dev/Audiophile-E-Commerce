import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

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
// Admin routes
router
  .route("/admin/users")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser);
// Update user role
router
  .route("/admin/user/:id/role")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateUserRole);
// Delete user
router
  .route("/admin/user/:id")
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteUser);
export default router;
