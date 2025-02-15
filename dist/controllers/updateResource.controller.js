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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const User_1 = require("../models/User");
const database_1 = require("../config/database");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resourceId, newData } = req.body;
        if (!newData || !newData.email) {
            return res.status(400).json({ message: "Invalid request: new email is required" });
        }
        const userRepo = database_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOneBy({ id: resourceId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.email = newData.email;
        yield userRepo.save(user);
        return res.json({ message: "User updated successfully", user });
    }
    catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
