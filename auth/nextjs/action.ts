import { z } from "zod";
import { signInSchema, signUpSchema } from "./schemas";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const result = signInSchema.safeParse(unsafeData);
  console.log(result);

  if (!result.success) {
    console.log("bye");

    result.error;
  } else {
    console.log("hi");

    console.log(result.data);
  }
}
