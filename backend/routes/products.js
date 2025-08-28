import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Get all products
router.route("/").get(verifyUserAuth, getAllProducts);
// Create a new product
router.route("/").post(verifyUserAuth, roleBasedAccess("admin"), createProduct);
// Update and delete product by ID
router
  .route("/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

// Add more routes (POST, PUT, DELETE) as needed

export default router;
