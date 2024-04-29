import express from "express";
import { PORT } from "./config";

const app = express();

app.use(express.json());

app.get((req, res) => {});

app.post((req, res) => {});

app.put((req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
