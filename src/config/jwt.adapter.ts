import jwt from "jsonwebtoken";
import { envs } from "./envs";

const secretKey = envs.SEED;

export const jwtAdapter = {
  generateToken: (payload: any, duration: string = "2h") => {
    const token = jwt.sign(payload, secretKey, { expiresIn: duration });
    return token;
  },

  validateToken: (token: string) => {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  },
};
