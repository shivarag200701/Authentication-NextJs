"use server";
import { z } from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import { PrismaClient } from "@/generated/prisma";
import crypto from "crypto";
import { passwordHasher } from "../core/passwordHasher";
import { createSession } from "../core/createUserSession";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
//     const {data, success} = signInSchema.safeParse(unsafeData)

//     if(!success){
//         return Error("Pass proper data")
//     }
//     const user =
// }

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { data, success } = signUpSchema.safeParse(unsafeData);

  if (!success) {
    return Error("Pass proper data");
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

    //Storing in database
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        salt: salt,
      },
    });

    const sessionId = await createSession(newUser.id);
  } catch (e) {
    console.error("error while saving data to database:", e);
  }

  redirect("/");
}
