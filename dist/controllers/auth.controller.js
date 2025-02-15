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
exports.logout = exports.login = void 0;
const server_1 = require("../server");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_1 = require("../services/auth.service");
const cache_1 = __importDefault(require("../utils/cache"));
const env_1 = require("../config/env");
const activeSessions = new Map();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        let user = cache_1.default.get(email);
        if (!user) {
            user = yield auth_service_1.AuthService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            cache_1.default.set(email, { id: user.id, email: user.email }, 3600);
        }
        cache_1.default.delete(email);
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const existingSession = activeSessions.get(user.email);
        if (existingSession) {
            server_1.io.to(existingSession).emit("forceLogout");
        }
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id, email: user.email }, env_1.env.JWT_SECRET, { expiresIn: "1h" });
        activeSessions.set(user.email, ((_a = req.session) === null || _a === void 0 ? void 0 : _a.id) || "");
        cache_1.default.set(user.email, { token, userId: user.id }, 3600);
        return res.json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (activeSessions.has(email)) {
            activeSessions.delete(email);
        }
        cache_1.default.delete(email);
        return res.json({ message: "Logout successful" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.logout = logout;
