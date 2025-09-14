import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  category: String,
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
  stock: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
