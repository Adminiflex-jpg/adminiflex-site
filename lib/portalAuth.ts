import jwt, { JwtPayload } from "jsonwebtoken";

const PORTAL_JWT_SECRET =
  process.env.PORTAL_JWT_SECRET || process.env.JWT_SECRET || "";

export type PortalSessionRole =
  | "SUPER_USER"
  | "ADMIN_MEDEWERKER"
  | "CONTROLLER"
  | "ACCOUNTANT";

export interface PortalSessionPayload extends JwtPayload {
  uid: string;
  role: PortalSessionRole;
  customerId: string;
  customerNumber: string;
}

export function signPortalSession(
  payload: PortalSessionPayload,
  maxAgeDays = 7
): string {
  if (!PORTAL_JWT_SECRET) {
    throw new Error("PORTAL_JWT_SECRET ontbreekt");
  }
  return jwt.sign(payload, PORTAL_JWT_SECRET, {
    expiresIn: `${maxAgeDays}d`,
  });
}

export function verifyPortalSession<T extends JwtPayload = PortalSessionPayload>(
  token: string
): T {
  if (!PORTAL_JWT_SECRET) {
    throw new Error("PORTAL_JWT_SECRET ontbreekt");
  }
  return jwt.verify(token, PORTAL_JWT_SECRET) as T;
}

