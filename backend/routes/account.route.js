import { Router } from "express";
import { Account } from "../db/db.js";

const router = Router();

router.get("/balance", async (req, res) => {
  const account = Account.findOne({
    userId: req.userId,
  });
  res.json({ balance: account.balance });
});

router.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Invalid account",
    });
  }
  // * Performing the transfer here
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

export default router;
