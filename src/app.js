const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Personal Finance Tracker API");
});

// Importing Routes
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("api/accounts", accountRoutes);
app.use("api/transactions", transactionRoutes);
app.use("api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
