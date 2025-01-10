import jwt from "jsonwebtoken";
import { envs } from "./envs";

const secretKey = envs.SEED;

export const jwtAdapter = {
  generateToken: (payload: any, duration: string = "2h") => {
    const token = jwt.sign(payload, secretKey, { expiresIn: duration });
    return token;
  },

  validateToken: async <T>(token: string): Promise<T | null> => {
    try {
      const decoded = jwt.verify(token, secretKey) as T;
      return decoded;
    } catch (error) {
      console.error("Token validation failed:", error);
      return null;
    }
  },
};
