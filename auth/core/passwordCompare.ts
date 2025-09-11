import { z } from "zod";
import { passwordHasher } from "./passwordHasher";
import crypto from "crypto";

export async function passwordCompare(
  userPassword: string,
  password: string,
  salt: string
): Promise<boolean> {
  const hashedPassword = await passwordHasher(userPassword, salt);
  const isMatch = crypto.timingSafeEqual(
    Buffer.from(hashedPassword, "hex"),
    Buffer.from(password, "hex")
  );
  return isMatch;
}
