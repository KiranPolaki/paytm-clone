import { Router } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";
import { Account, User } from "../db/db.js";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middleware/middleware.js";

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
  try {
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
      return res.status(411).json({
        message: "Dude for real you don't have firstname or lastname",
      });
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
    // * default income on signup
    // TODO: Lets make this a little bit fun by asking properties and giving credit
    await Account.create({
      userId,
      balance: Math.floor(1 + Math.random() * 10000),
    });
    // * JsonWebTokens create a token fro Auth
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({ message: "User created and stored!", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while signing up", error: error });
  }
});

router.post("/signin", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        message: "Error while updating information",
      });
    }

    await User.updateOne(
      {
        _id: req.userId,
      },
      req.body
    );

    res.json({
      message: "Updated Successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      _id: { $ne: req.userId },
      $or: [
        {
          firstname: {
            $regex: filter,
          },
        },
        {
          lastname: {
            $regex: filter,
          },
        },
      ],
    });
    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: error,
    });
  }
});

export default router;
