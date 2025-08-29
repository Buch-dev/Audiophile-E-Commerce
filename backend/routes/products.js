import express from "express";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Get all products
router.route("/").get(getAllProducts);
router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);
// Create a new product
router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProduct);
// Update and delete product by ID
router
  .route("/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

// Add more routes (POST, PUT, DELETE) as needed
router.route("/:id").get(getSingleProduct);

export default router;
