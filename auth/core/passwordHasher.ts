import crypto from "crypto";

export async function passwordHasher(
  password: string,
  salt: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
      if (err) reject(err);
      resolve(hash.toString("hex").normalize());
    });
  });
}
