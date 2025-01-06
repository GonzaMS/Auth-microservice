import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRotes {
  static get routes(): Router {
    const router = Router();

    //* Routes
    router.use("/api/v1/auth", AuthRoutes.routes);

    return router;
  }
}
