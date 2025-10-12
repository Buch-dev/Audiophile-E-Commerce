import handleAsyncError from "../middleware/handleAsyncError.js";
import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import mongoose from "mongoose";

// Get all Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();

  return res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// Get all unique categories from products
export const getAllProductCategories = handleAsyncError(async (req, res, next) => {
  const categories = await Product.distinct("category");

  return res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

// Create a new Product
export const createProduct = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// Update product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, image, category } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new HandleError("Invalid product ID format", 400));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, price, description, image, category },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return next(new HandleError("Product not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

// Delete product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new HandleError("Invalid product ID format", 400));
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return next(new HandleError("Product not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product: deletedProduct,
  });
});

// Get Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new HandleError("Invalid product ID format", 400));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// Creating and Updating Review
export const createOrUpdateReview = handleAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  // Validate input
  if (!productId || !rating) {
    return next(new HandleError("Product ID and rating are required", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new HandleError("Invalid product ID format", 400));
  }

  if (rating < 1 || rating > 5 || !Number.isInteger(Number(rating))) {
    return next(
      new HandleError("Rating must be a number between 1 and 5", 400)
    );
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  // Check if user has already reviewed the product
  const existingReviewIndex = product.reviews.findIndex(
    (review) => review.user.toString() === req.user.id.toString()
  );

  if (existingReviewIndex !== -1) {
    // Update existing review
    product.reviews[existingReviewIndex].rating = Number(rating);
    product.reviews[existingReviewIndex].comment = comment || "";
    product.reviews[existingReviewIndex].updatedAt = new Date();
  } else {
    // Create new review
    product.reviews.push({
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment || "",
      createdAt: new Date(),
    });
  }

  // Update product statistics
  product.numOfReviews = product.reviews.length;

  // Calculate average rating
  const totalRating = product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  product.ratings =
    product.reviews.length > 0
      ? (totalRating / product.reviews.length).toFixed(1)
      : 0;

  await product.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message:
      existingReviewIndex !== -1
        ? "Review updated successfully"
        : "Review created successfully",
    product,
  });
});

// Alternative version using route parameter instead of query
export const getProductReviewsByParam = handleAsyncError(
  async (req, res, next) => {
    const { productId } = req.params;

    console.log("=== ROUTE PARAM VERSION ===");
    console.log("req.params:", req.params);
    console.log("Extracted productId:", productId);

    if (!productId) {
      return next(new HandleError("Product ID is required", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return next(new HandleError("Invalid product ID format", 400));
    }

    const product = await Product.findById(productId);

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      reviews: product.reviews || [],
    });
  }
);

// Deleting Reviews
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  const reviews = (product.reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  ));
  await product.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    reviews,
  });
});

// Get a sample product ID for testing
export const getFirstProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findOne();

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "No products found in database",
    });
  }

  return res.status(200).json({
    success: true,
    message: "First product found",
    data: {
      productId: product._id,
      productName: product.name,
      useThisIdForTesting: product._id.toString(),
    },
  });
});

// Admin - Get All Products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();

  return res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// Get products with filters and pagination
export const getFilteredProducts = handleAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "-createdAt";
  const category = req.query.category;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const search = req.query.search;

  // Build filter object
  const filter = {};

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  // Execute query
  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  // Get total count for pagination
  const total = await Product.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    data: {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  });
});
