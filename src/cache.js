// @ts-check
import { buildStorage } from "axios-cache-interceptor";
import { promises as fs } from "fs";
import path from "path";

// Define the cache directory
export const CACHE_DIR = path.resolve(process.cwd(), ".cache");

// Ensure the cache directory exists
async function ensureCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating cache directory:", error);
  }
}

// Helper function to get the cache file path
function getCacheFilePath(key) {
  return path.join(CACHE_DIR, `${encodeURIComponent(key)}.json`);
}

// Cache storage implementation using fs.promises
const cacheStorage = buildStorage({
  async find(key) {
    const filePath = getCacheFilePath(key);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return undefined; // Cache miss
      }
      console.error("Error reading cache file:", error);
    }
  },

  async set(key, value) {
    const filePath = getCacheFilePath(key);
    try {
      await fs.writeFile(filePath, JSON.stringify(value), "utf-8");
    } catch (error) {
      console.error("Error writing to cache file:", error);
    }
  },

  async remove(key) {
    const filePath = getCacheFilePath(key);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Error removing cache file:", error);
      }
    }
  },

  clear() {},
});

// Create cache directory if not exists
ensureCacheDir();

export default cacheStorage;
