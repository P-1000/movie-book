import express from "express";
import { register, login, adminLogin , adminRegister } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/admin/login", adminLogin);


export default authRouter;
