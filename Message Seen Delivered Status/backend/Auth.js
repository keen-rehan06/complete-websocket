import express from "express";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import { generateToken } from "./utils/token.js";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,  
  });

  res.json(user);
});

// login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ error: "User not found" });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.json({ error: "Wrong password" });
  const token = generateToken(user);
  res.json({ token, user });
});

export default router;