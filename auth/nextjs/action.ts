"use server";
import { z } from "zod";
import { sessionSchema, signInSchema, signUpSchema } from "./schemas";
import { PrismaClient } from "@/generated/prisma";
import crypto from "crypto";
import { passwordHasher } from "../core/passwordHasher";
import { createSession } from "../core/createUserSession";
import { getUserSession } from "../core/getUserFromSession";
import { passwordCompare } from "../core/passwordCompare";
import { deleteSession } from "../core/deleteSession";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { data, success } = signInSchema.safeParse(unsafeData);

  if (!success) {
    throw new Error("Pass proper data");
  }

  const user = await getUserSession();

  if (user) {
    return user;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!existingUser) {
    throw new Error("user not found");
  }

  const { password, salt } = existingUser;
  const result = await passwordCompare(data.password, password, salt);
  if (!result) {
    throw new Error("Incorrect Password");
  }

  await createSession(sessionSchema.parse(existingUser));
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { data, success } = signUpSchema.safeParse(unsafeData);

  if (!success) {
    throw new Error("Pass proper data");
  }

  //check for existing email
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    throw new Error("Email already taken");
  }

  try {
    //password hashing
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await passwordHasher(data?.password, salt);
    const role = "user";

    //Storing in database
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        salt: salt,
      },
    });

    await createSession(sessionSchema.parse(newUser));
  } catch (e) {
    console.error("error while saving data to database:", e);
  }
}

export async function logOut() {
  await deleteSession();
  redirect("/");
}
