import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./Route/user.js"; // Use the ".js" extension for ES modules
import adminRoutes from "./Route/admin.js";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json({ limit: "20kb" }));
// take data from the url
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
// to upload the data public it can use by all:
app.use(express.static("public"));
//
app.use(cookieParser());

// Routes
import userRouer from "./Route/user.js";
import adminrouter from "./Route/admin.js";
app.use("/api/user", userRouer);
app.use("/api/admin", adminrouter);
// app.use("/api/admin", adminRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
    console.log("MongoDB connection established");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the server only if MongoDB connects
connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Failed to start server: ", error);
  });
