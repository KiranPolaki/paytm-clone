import express from "express";
import userRouter from "./user.route.js";
const router = express.Router();

router.use("/user", userRouter);

router.use("/account", accountRouter);

// app.use("/api/v2", v2Router);
