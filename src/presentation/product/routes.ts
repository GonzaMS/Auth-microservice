import { Router } from "express";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/");

    return router;
  }
}
