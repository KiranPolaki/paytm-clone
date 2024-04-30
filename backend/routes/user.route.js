import { Router } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";

const router = Router();

const usernameSchema = zod.string();
const firstnameSchema = zod.string();
const lastnameSchema = zod.string();
const password = zod.string().min(6);

router.post("/signup", (req, res) => {
  const username = req.body?.username;
  const firstname = req.body?.username;
  const lastname = req.body?.username;
  const password = req.body?.password;
  const userRes = usernameSchema.safeParse(username);
  const firstnameRes = firstnameSchema.safeParse(firstname);
  const lastnameRes = lastnameSchema.safeParse(lastname);
});
// router.get("/signup", (req, res) => {});
// router.get("/signup", (req, res) => {});

export { router };
