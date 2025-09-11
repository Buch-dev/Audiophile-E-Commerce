import express from "express";
import {
  createOrUpdateReview,
  createProduct,
  deleteProduct,
  getAdminProducts,
  getAllProducts,
  getProductReviewsByParam,
  getFirstProduct,
  getSingleProduct,
  updateProduct,
  deleteReview,
} from "../controllers/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Public routes
router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);

// Debug route - get first product ID for testing
router.route("/debug/first-product").get(getFirstProduct);

// Reviews routes - TWO OPTIONS
// Option 1: Query parameter (current setup)
/* router.route("/reviews").get(getProductReviews); */

// Option 2: Route parameter (alternative)
router.route("/reviews/:productId").get(getProductReviewsByParam);

// Review management
router.route("/review").post(verifyUserAuth, createOrUpdateReview);
router.route("/reviews").delete(verifyUserAuth, deleteReview);

// Admin routes
router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProduct);

// Product management by ID
router
  .route("/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

export default router;

// ===== POSTMAN TESTING GUIDE =====
/*

STEP 1: Get a valid product ID
GET {{baseURL}}/api/v1/products/debug/first-product

STEP 2: Test reviews with query parameter
GET {{baseURL}}/api/v1/products/reviews?productId=YOUR_PRODUCT_ID_HERE

STEP 3: Test reviews with route parameter (alternative)
GET {{baseURL}}/api/v1/products/reviews/YOUR_PRODUCT_ID_HERE

Example URLs:
- Query param: http://localhost:3000/api/v1/products/reviews?productId=507f1f77bcf86cd799439011
- Route param: http://localhost:3000/api/v1/products/reviews/507f1f77bcf86cd799439011

*/
