import handleAsyncError from "../middleware/handleAsyncError.js";
import Product from "../models/productModel.js";

// Get all Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new Product
export const createProduct = async (req, res) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

// Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, image, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product (optional, not in the original snippet)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// Admin - Get All Products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});