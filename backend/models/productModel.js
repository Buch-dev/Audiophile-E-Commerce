import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  category: String,
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
