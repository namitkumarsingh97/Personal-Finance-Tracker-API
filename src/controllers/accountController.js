const Account = require("../models/Account");

const createAccount = async (req, res) => {
  try {
    const { accountName, balance } = req.body;
    const account = new Account({
      userId: req.user.id,
      accountName,
      balance,
    });

    await account.save();
    res.status(201).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createAccount, getAccounts };
