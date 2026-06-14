import express from "express";
import { login } from "./login.js";
import { logoutUser } from "./logout.js";

const app = express.Router();

app.post("/login",login);
app.get("/logout",logoutUser);

export default app;