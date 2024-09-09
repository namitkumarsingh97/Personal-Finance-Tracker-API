const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

const createTransaction = async (req, res) => {
  try {
    const { accountId, type, amount, description, category } = req.body;

    // Check if account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    // Create a new transaction
    const transaction = new Transaction({
      userId: req.user.id,
      accountId,
      type,
      amount,
      description,
      category,
    });

    await transaction.save();

    // Update the account balance
    if (type === "income") {
      account.balance += amount;
    } else if (type === "expense") {
      account.balance -= amount;
    }

    await account.save();

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;

    // Fetch transactions for a specific account
    const transactions = await Transaction.find({
      userId: req.user.id,
      accountId,
    });

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Find the transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    // Find the account and update the balance accordingly
    const account = await Account.findById(transaction.accountId);
    if (transaction.type === "income") {
      account.balance -= transaction.amount;
    } else if (transaction.type === "expense") {
      account.balance += transaction.amount;
    }
    await account.save();

    // Delete the transaction
    await transaction.remove();

    res.status(200).json({ success: true, message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createTransaction, getTransactions, deleteTransaction };
