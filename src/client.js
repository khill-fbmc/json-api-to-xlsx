// @ts-check
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import DiskCache from "./cache.js";

const instance = Axios.create({
  baseURL: "https://api.sleeper.app/v1",
});

export const client = setupCache(instance, {
  storage: DiskCache,
  ttl: 3_600,
});
