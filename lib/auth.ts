import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import speakeasy from "speakeasy";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export type SessionRole =
  | "admin" // jouw huidige beheerderslogin
  | "tenant-admin"
  | "tenant-medewerker"
  | "tenant-controller"
  | "tenant-accountant";

export interface SessionTokenPayload extends JwtPayload {
  uid: string; // userId
  role: SessionRole;
  tenantId?: string; // alleen voor tenant-users
  tenantSlug?: string; // handig voor URL
  planName?: "BASIC" | "PLUS" | "PRO";
}

export function signSession(payload: SessionTokenPayload, maxAgeDays = 7): string {
  if (!JWT_SECRET) throw new Error("JWT_SECRET ontbreekt");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${maxAgeDays}d` });
}

export function verifySession<T extends JwtPayload = SessionTokenPayload>(
  token: string
): T {
  if (!JWT_SECRET) throw new Error("JWT_SECRET ontbreekt");
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
