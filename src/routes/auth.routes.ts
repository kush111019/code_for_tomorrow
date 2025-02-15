import { Router } from "express";
import * as AuthController from "../controllers/auth.controller"; 

const router = Router();

router.post("/login", AuthController.login);
router.post("/logout" , AuthController.logout);

export default router;
