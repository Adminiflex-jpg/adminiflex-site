// lib/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export type JwtPayloadCustom = { uid: string; role: string };

export function signSession(payload: JwtPayloadCustom, maxAgeDays = 7) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${maxAgeDays}d` });
}
export function verifySession<T = any>(token: string) {
  return jwt.verify(token, JWT_SECRET) as T;
}
export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
export function verifyTotp(code: string, base32Secret: string) {
  return speakeasy.totp.verify({
    secret: base32Secret,
    encoding: "base32",
    token: code.replace(/\s+/g, ""),
    window: 1,
  });
}
export function generateTotpSecret(label = "AdminiFlex", account = "user") {
  return speakeasy.generateSecret({
    name: `${label} (${account})`, // voor Microsoft/Google Authenticator
    length: 20,
  });
}
