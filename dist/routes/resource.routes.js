"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const updateResource_controller_1 = require("../controllers/updateResource.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.put("/update", auth_middleware_1.authMiddleware, updateResource_controller_1.updateUser);
exports.default = router;
