import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Product routes
app.use("/api/products", productRoutes);

// User routes
app.use("/api/users", userRoutes);

// Error middleware (should be last)
app.use(errorMiddleware);

export default app;
