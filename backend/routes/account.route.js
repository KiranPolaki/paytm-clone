import { Router } from "express";
import { Account } from "../db/db.js";

const router = Router();

router.get("/balance", async (req, res) => {
  const account = Account.findOne({
    userId: req.userId,
  });
  res.json({ balance: account.balance });
});

router.post("/transfer", (req, res) => {
  const toUser = req.body.to;
  const amount = req.body.amount;
});

export default router;
