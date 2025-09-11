"use server";
import { cookies } from "next/headers";
import { redisClient } from "@/redis/redisConnection";
import { sessionSchema } from "../nextjs/schemas";
import { z } from "zod";

export async function getUserSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionID")?.value;

  if (!sessionId) return null;

  return getRedisData(sessionId);
}

export async function getRedisData(
  sessionId: string
): Promise<z.infer<typeof sessionSchema> | null> {

  const raw = await redisClient.get(`sessionId:${sessionId}`);
  if (!raw) return null;
  if (typeof raw === "string") {
    console.log("redis returns a string");
  }
  const value = typeof raw === "string" ? JSON.parse(raw) : raw;

  const { data, success, error } = sessionSchema.safeParse(value);

  if (!success) {
    console.error("Invalid session in Redis:", error);
    return null;
  }
  return data;
}
