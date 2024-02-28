import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export function generateToken(username: string) {
  return jwt.sign({ username }, JWT_SECRET);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
