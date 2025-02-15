import { Router } from "express";
import  { updateUser }  from "../controllers/updateResource.controller";
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router();

router.put("/update", authMiddleware , updateUser); 

export default router;
