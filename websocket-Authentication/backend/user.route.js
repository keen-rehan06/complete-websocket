import express from "express";
import login from "./user.login.js";

const router = express.Router();

router.post("/login", login);

export default router;