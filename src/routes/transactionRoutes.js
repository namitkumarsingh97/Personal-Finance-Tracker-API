const express = require("express");
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

// Create a new transaction (income or expense)
router.post("/", createTransaction);

// Get all transactions for a specific account
router.get("/:accountId", getTransactions);

// Delete a transaction
router.delete("/:transactionId", deleteTransaction);

module.exports = router;
