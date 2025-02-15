import { Request, Response } from "express";
import cache from "../utils/cache";


export const getCache = async (req: Request, res: Response): Promise<any> => {
    try {
        const key = req.params.key;
        console.log("Fetching cache for key:", key);
        const value = cache.get(key);
        console.log("Cache retrieved:", value);
        return res.json({ key, value });
    } catch (error) {
        return res.status(500).json({ error }); 
    }
};

export const setCache = async (req: Request, res: Response) :Promise<any> => {
    try {
        const { key, value, ttl } = req.body;
        cache.set(key, value, ttl || 300000);
        return res.json({ message: "Cache set successfully" });
    } catch (error) {
        return res.status(500).json({ error }); 
    }
};

export const deleteCache = async (req: Request, res: Response) :Promise<any> => {
    try {
        console.log(req.params.key)
        const key = req.params.key;
        cache.delete(key);
        return res.json({ message: "Cache deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error }); 
    }
};
