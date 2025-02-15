"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log("token is : ", token);
        console.log("env.JWT_SECRET IS : ", env_1.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = yield new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET, (err, decoded) => {
                if (err)
                    reject(err);
                else
                    resolve(decoded);
            });
        });
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
});
exports.authMiddleware = authMiddleware;
