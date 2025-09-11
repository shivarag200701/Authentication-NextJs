import { z } from "zod";
import { sessionSchema } from "../nextjs/schemas";
import { getUserSession } from "./getUserFromSession";
import { redirect } from "next/navigation";

export function getCurrentUser(options: {
  redirectIfNotFound: false;
}): Promise<null>;

export function getCurrentUser(options: {
  redirectIfNotFound: true;
}): Promise<z.infer<typeof sessionSchema>>;

export async function getCurrentUser({ redirectIfNotFound = false } = {}) {
  const user = await getUserSession();

  if (user == null) {
    if (redirectIfNotFound) {
      redirect("/signUp");
    }
    return null;
  }

  return user;
}
