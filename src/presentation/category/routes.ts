import { Router } from "express";
import { CategoryController } from "./controller";
import {
  CategoryDatasourceImpl,
  CategoryRepositoryImpl,
} from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryDatasource = new CategoryDatasourceImpl();

    const categoryRepository = new CategoryRepositoryImpl(categoryDatasource);

    const controller = new CategoryController(categoryRepository);

    //* Routes
    router.get("/", controller.getAll);
    router.post("/", [AuthMiddleware.validateJWT], controller.create);

    return router;
  }
}
