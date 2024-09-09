const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Account = require("./models/Account");
const Transaction = require("./models/Transaction");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config();

// Connect to the database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.log("DB connection error:", err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Account.deleteMany();
    await Transaction.deleteMany();

    // Create a default user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    const defaultUser = new User({
      username: "default_user",
      email: "default@example.com",
      password: hashedPassword,
    });
    const savedUser = await defaultUser.save();

    // Create a default account for the user
    const defaultAccount = new Account({
      userId: savedUser._id,
      accountName: "Main Account",
      balance: 50000,
    });
    const savedAccount = await defaultAccount.save();

    // Create a default transaction for the account
    const defaultTransaction = new Transaction({
      userId: savedUser._id,
      accountId: savedAccount._id,
      type: "income",
      amount: 10000,
      description: "Salary",
      category: "Salary",
    });
    await defaultTransaction.save();

    console.log("Data successfully seeded!");
    process.exit();
  } catch (error) {
    console.error("Error while seeding data", error);
    process.exit(1);
  }
};

seedData();
