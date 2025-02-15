import { Router } from "express";
import { UserController } from "../controllers/user.controller";


const router = Router();


router.get("/getAll",UserController.getAllUsers);


export default router;