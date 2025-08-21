import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Get all products
router.route("/").get(getAllProducts);
// Create a new product
router.route("/").post(createProduct);
// Update and delete product by ID
router.route("/:id").put(updateProduct).delete(deleteProduct);

// Add more routes (POST, PUT, DELETE) as needed

export default router;
