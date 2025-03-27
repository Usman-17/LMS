import express from "express";

import dbConnect from "./db/ConnectMongoDB.js";
import "dotenv/config";
import cors from "cors";

import webhookRoutes from "./routes/clerk.route.js";
// imports End

// Cors
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API Working")),
  app.use("/api/webhooks", webhookRoutes);

// Running App
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
