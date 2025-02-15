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
exports.deleteCache = exports.setCache = exports.getCache = void 0;
const cache_1 = __importDefault(require("../utils/cache"));
const getCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.params.key;
        console.log("Fetching cache for key:", key);
        const value = cache_1.default.get(key);
        console.log("Cache retrieved:", value);
        return res.json({ key, value });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getCache = getCache;
const setCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key, value, ttl } = req.body;
        cache_1.default.set(key, value, ttl || 300000);
        return res.json({ message: "Cache set successfully" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.setCache = setCache;
const deleteCache = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.key);
        const key = req.params.key;
        cache_1.default.delete(key);
        return res.json({ message: "Cache deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.deleteCache = deleteCache;
