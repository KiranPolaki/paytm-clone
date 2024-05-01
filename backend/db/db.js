import mongoose from "mongoose";

import { DB_NAME, MONGO_URL } from "../config.js";

(async function () {
  try {
    await mongoose.connect(`${MONGO_URL}${DB_NAME}`);
    console.log("⚙️  Mongo is connected!");
  } catch (err) {
    console.log("cant connect to DB");
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
      required: true,
    },
  },
  { timestamps: true }
);

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: "String",
    },
    balance: {
      type: "String",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
