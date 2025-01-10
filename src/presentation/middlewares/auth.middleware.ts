import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization)
      return res.status(401).json({ error: "No token provided" });

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json("Invalid Bearer token");

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await jwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      // TODO: Refactor this on another layout
      const user = await prisma.user.findFirst({
        where: {
          id: Number(payload.id),
        },
      });

      if (!user) return res.status(401).json({ error: "Invalid token - user" });

      if (!user.emailValidated)
        return res.status(401).json({ error: "User not validated" });

      req.body.user = UserEntity.mapToEntity(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }

    next();
  }
}
