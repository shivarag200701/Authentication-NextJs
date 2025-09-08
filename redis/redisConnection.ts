import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = new Redis({
  url: "https://intent-krill-18934.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
