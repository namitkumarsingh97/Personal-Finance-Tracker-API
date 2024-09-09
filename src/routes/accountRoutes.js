const express = require("express");
const {
  createAccount,
  getAccounts,
} = require("../controllers/accountController");

const router = express.Router();

// Create new account
router.post("/", createAccount);

// Get all accounts
router.get("/", getAccounts);

module.exports = router;
