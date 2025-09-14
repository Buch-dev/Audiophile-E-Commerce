import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Product routes
app.use("/api/v1/products", productRoutes);

// User routes
app.use("/api/v1/users", userRoutes);

// Order routes
app.use("/api/v1/orders", orderRoutes);

// Error middleware (should be last)
app.use(errorMiddleware);

export default app;
