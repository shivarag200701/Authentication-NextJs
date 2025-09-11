import crypto from "crypto";
import { redisClient } from "@/redis/redisConnection";
import { cookies } from "next/headers";
import { sessionSchema } from "../nextjs/schemas";
import { z } from "zod";
import { getUserSession } from "./getUserFromSession";

const SESSION_EXPIRATION = 60 * 60 * 24 * 7 * 1000;
const cookieExpire = new Date(Date.now() + SESSION_EXPIRATION);
const redis = redisClient;

export async function createSession(user: z.infer<typeof sessionSchema>) {
  const cookieStore = await cookies();

  const sessionId = crypto.randomBytes(512).toString("hex");
  try {
    await redis.set(
      `sessionId:${sessionId}`,
      { id: user.id, name: user.name },
      {
        ex: SESSION_EXPIRATION,
      }
    );
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

export async function updateUserSessionExpiration() {
  const cookieStore = await cookies();

  const sessionId = await cookieStore.get("sesssionID")?.value;

  if (sessionId == null) {
    return null;
  }

  const user = await getUserSession();

  if (user == null) {
    return null;
  }
  await redis.set(
    `sessionId:${sessionId}`,
    { id: user.id, name: user.name },
    {
      ex: SESSION_EXPIRATION,
    }
  );
  cookieStore.set("sessionID", sessionId, {
    expires: cookieExpire,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
}
