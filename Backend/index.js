import express from "express";

import dbConnect from "./db/ConnectMongoDB.js";
import "dotenv/config";
// imports End

// Cors
const app = express();

// Middlewares
app.use(express.json());

// Routes

// Running App
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
