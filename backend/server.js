import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import mainRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(PORT || 3000, () => {
  console.log("Litening");
});

// Basically this is how the requests are going to look
//  /api/v1/user/signup
//  /api/v1/user/signin
//  /api/v1/user/changePassword

//  /api/v1/account/transferMoney
//  /api/v1/account/balance
