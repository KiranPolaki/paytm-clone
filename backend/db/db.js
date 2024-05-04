import mongoose from "mongoose";

import { DB_NAME, MONGO_URL } from "../config.js";
import { Schema } from "zod";

(async function () {
  try {
    await mongoose.connect(`${MONGO_URL}${DB_NAME}`);
    console.log("⚙️  Mongo is connected!");
  } catch (err) {
    console.log("Error connecting to DB :( ", err);
  }
})();

// TODO: Make sure user know this rules while login/signup (add instructions/alerts)
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLenth: 20,
    },
    firstname: {
      type: "String",
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastname: {
      type: "String",
      required: true,
      trim: true,
      maxLength: 50,
    },
    password: {
      type: "String",
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

export { User, Account };
