import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { ProductRoutes } from "./product/routes";

export class AppRotes {
  static get routes(): Router {
    const router = Router();

    //* Routes
    router.use("/api/v1/auth", AuthRoutes.routes);
    router.use("/api/v1/category", CategoryRoutes.routes);
    router.use("/api/v1/products", ProductRoutes.routes);

    return router;
  }
}
