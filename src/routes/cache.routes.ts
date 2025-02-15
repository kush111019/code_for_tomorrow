import { Router } from "express";
import { getCache, setCache, deleteCache } from "../controllers/cache.controller";

const router = Router();

router.post("/set", setCache);
router.get("/get/:key", getCache);
router.delete("/delete/:key", deleteCache);

export default router;
