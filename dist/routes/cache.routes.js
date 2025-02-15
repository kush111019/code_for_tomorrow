"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_controller_1 = require("../controllers/cache.controller");
const router = (0, express_1.Router)();
router.post("/set", cache_controller_1.setCache);
router.get("/get/:key", cache_controller_1.getCache);
router.delete("/delete/:key", cache_controller_1.deleteCache);
exports.default = router;
