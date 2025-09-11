import { z } from "zod";
import { redisClient } from "@/redis/redisConnection";
import { cookies } from "next/headers";

export async function deleteSession() {
  const cookieStore = await cookies();
  const redis = redisClient;

  const sessionId = cookieStore.get("sessionID");
  console.log(sessionId);

  await redis.del(`sessionId:${sessionId?.value}`);

  cookieStore.delete("sessionID");

  console.log("redis deleted");
}
