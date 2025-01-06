import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController();

    //* Routes
    router.post("/login", controller.login);
    router.post("/register", controller.register);

    //* Validate token route
    router.get("/validate-email/:token", controller.validateEmail);

    return router;
  }
}
