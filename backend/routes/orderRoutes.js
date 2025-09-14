import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersAdmin,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.route("/new/order").post(verifyUserAuth, createOrder);
// Admin routes
router
  .route("/admin/orders/:id")
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleOrder)
  .put(verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteOrder);
router.route("/user/orders").get(verifyUserAuth, getAllOrders);
router
  .route("/admin/orders")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAllOrdersAdmin);

export default router;
