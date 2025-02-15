interface CacheData {
    [key: string]: any;
}

class LocalCache {
    private cache: CacheData = {};

    set(key: string, value: any, ttl: number = 300000) {
        this.cache[key] = { value, expiresAt: Date.now() + ttl }; 
    }

    get(key: string) {
        const cached = this.cache[key];
        if (!cached || cached.expiresAt < Date.now()) { 
            delete this.cache[key];
            return null;
        }
        return cached.value;
    }

    delete(key: string) {
        delete this.cache[key];
    }
}

export default new LocalCache();
