import { Redis } from "@upstash/redis";

export const redisClient = new Redis({
  url: "https://intent-krill-18934.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
