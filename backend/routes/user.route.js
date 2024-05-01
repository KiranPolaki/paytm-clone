import { Router } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";
import { User } from "../db/db.js";
import { JWT_SECRET } from "../config.js";

const router = Router();

const signupBody = zod.object({
  email: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(8),
});
const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

router.post("/signup", async (req, res) => {
  const resp = signupBody.safeParse(req.body);
  // * ZOD Validation
  if (!resp.success) {
    if (resp.error.issues[0].message === "Invalid email") {
      return res.status(411).json({ message: "Invalid Email" });
    } else if (resp.error.issues[0].code === "too_small") {
      return res
        .status(411)
        .json({ message: "String must contain at least 8 character(s)" });
    }
  }
  if (resp.data.firstname === "" || resp.data.lastname === "") {
    return res
      .status(411)
      .json({ message: "Dude for real you don't have firstname or lastname" });
  }
  // * Mongo Validation
  const existingEmail = await User.findOne({
    email: req.body.email,
  });
  if (existingEmail) {
    return res.status(411).json({
      message: "Email already taken i guess",
    });
  }
  // ! We dont usually store the passwords inside the DB which poses the security concerns
  // * Create entry in Mongo
  const user = await User.create({
    email: req.body?.email,
    password: req.body?.password,
    firstname: req.body?.firstname,
    lastname: req.body?.lastname,
  });
  const userId = user._id;
  // * JsonWebTokens create a token fro Auth
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({ message: "User created and stored!", token: token });
});

router.post("/signin", async (req, res) => {
  const resz = signinBody.safeParse(req.body);
  // * Zod Validation
  if (!resz.success) {
    return res.status(411).json({ message: "Incorrect creds" });
  }
  const user = await User.findOne({
    email: req.body?.email,
    password: req.body?.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while Login try again, user doesnt exist/ creds invalid",
  });
});

export default router;
