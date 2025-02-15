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
exports.AuthService = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../config/env");
const database_1 = require("../config/database");
class AuthService {
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOneBy({ email });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
                throw new Error("Invalid credentials");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, env_1.env.JWT_SECRET, { expiresIn: "1h" });
            return { token };
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            return userRepository.findOneBy({ email });
        });
    }
}
exports.AuthService = AuthService;
