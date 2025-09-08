import { z } from "zod";
import { Redis } from "@upstash/redis";
import crypto from "crypto";
import { redisClient } from "@/redis/redisConnection";
import { cookies } from "next/headers";

const SESSION_EXPIRATION = 60 * 60 * 24 * 7;
const cookieExpire = new Date(Date.now() + SESSION_EXPIRATION);

export async function createSession(usedID: number) {
  const sessionId = crypto.randomBytes(512).toString("hex");
  try {
    const redis = redisClient;
    await redis.set(`userId:${usedID}`, sessionId, { ex: SESSION_EXPIRATION });
    const cookieStore = await cookies();
    cookieStore.set("sessionID", sessionId, {
      expires: cookieExpire,
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });
  } catch (error) {
    console.error("failed to set to redis");
  }
}
