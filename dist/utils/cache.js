"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalCache {
    constructor() {
        this.cache = {};
    }
    set(key, value, ttl = 300000) {
        this.cache[key] = { value, expiresAt: Date.now() + ttl };
    }
    get(key) {
        const cached = this.cache[key];
        if (!cached || cached.expiresAt < Date.now()) {
            delete this.cache[key];
            return null;
        }
        return cached.value;
    }
    delete(key) {
        delete this.cache[key];
    }
}
exports.default = new LocalCache();
