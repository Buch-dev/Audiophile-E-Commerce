import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image_mobile: String,
  image_tablet: String,
  image_desktop: String,
  image_product_mobile: String,
  image_product_tablet: String,
  image_product_desktop: String,
  category: String,
  version: String,
  features_I: String,
  features_II: String,
  in_the_box: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      item: {
        type: String,
        required: true,
      },
    },
  ],
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  ratings: { type: Number, default: 0 },
  numOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
