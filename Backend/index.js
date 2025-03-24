import express from "express";

import dbConnect from "./db/ConnectMongoDB.js";
import "dotenv/config";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
// imports End

// Cors
const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/clerk", userRoutes);

// Running App
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
