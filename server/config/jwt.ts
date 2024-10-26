import jwt from "jsonwebtoken";

const AT_SECRET_KEY = process.env.AT_SECRET_KEY;
const AT_LIFE = parseInt(process.env.AT_LIFE || "60");

const RT_SECRET_KEY = process.env.RT_SECRET_KEY;
const RT_LIFE = parseInt(process.env.RT_LIFE || "60");

if (!AT_SECRET_KEY || !RT_SECRET_KEY) {
  throw new Error("AT_SECRET_KEY or RT_SECRET_KEY is not defined in environment variables");
}
interface Payload {
  userName: string;
}

export const generateAT = (payload: Payload): string => {
  return jwt.sign(payload, AT_SECRET_KEY, { expiresIn: AT_LIFE });
};

export const verifyAT = (token: string): Payload | null => {
  try {
    return jwt.verify(token, AT_SECRET_KEY) as Payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

export const generateRT = (payload: Payload): string => {
  return jwt.sign(payload, RT_SECRET_KEY, { expiresIn: RT_LIFE });
};

export const verifyRT = (token: string): Payload | null => {
  try {
    return jwt.verify(token, RT_SECRET_KEY) as Payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};
