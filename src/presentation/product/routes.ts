import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductController } from "./controller";
import { ProductDatasourceImpl } from "../../infraestructure/datasources/producto.datasource.impl";
import { ProductRepositoryImpl } from "../../infraestructure/repositories/product.repository.impl";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productDatasource = new ProductDatasourceImpl();

    const productRepository = new ProductRepositoryImpl(productDatasource);

    const controller = new ProductController(productRepository);

    router.get("/", controller.getAll);
    router.post("/", [AuthMiddleware.validateJWT], controller.create);

    return router;
  }
}
