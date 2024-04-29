import mongoose from "mongoose";

import { DB_NAME, MONGO_URL } from "../config";

(async function () {
  try {
    await mongoose.connect(`${MONGO_URL}${DB_NAME}`);
  } catch (err) {
    console.log("cant connect to DB");
  }
})();

// TODO: Make sure user know this rules while login/signup (add instructions/alerts)
const userSchema = new mongoose.Schema(
  {
    username: {
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
      type: password,
      required: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
