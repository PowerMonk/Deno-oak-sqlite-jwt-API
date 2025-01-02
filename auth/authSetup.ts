import * as jose from "jose";
import { load } from "../dependencies/depsMod.ts";

const env = await load({
  export: true,
});

// Create a secret key for signing and verifying JWTs
const secretKey = new TextEncoder().encode(env.SECRET_JWT);

export async function generateJWT(
  payload: Record<string, unknown> // Payload to include in the JWT (e.g., user data)
): Promise<string> {
  // Create a new JWT using the jose library
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Set the algorithm and token type
    .setIssuedAt() // Set the "issued at" timestamp
    .setExpirationTime("2h") // Set the expiration time to 2 hours
    .sign(secretKey); // Sign the JWT using the secret key

  return jwt;
}

export async function verifyJWT(
  token: string // The JWT to verify
): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secretKey);

    // If the token is valid, return the payload (decoded data)
    return payload;
  } catch (error) {
    // If verification fails (e.g., token is invalid or expired), log the error and return null
    console.error("JWT verification failed:", error);
    return null;
  }
}
