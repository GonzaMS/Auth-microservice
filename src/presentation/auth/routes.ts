import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services-stop-using/auth.service";
import { AuthDatasourceImpl } from "../../infraestructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infraestructure/repositories/auth.repository.impl";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    //* Auth service
    // const authService = new AuthService();

    // const controller = new AuthController(authService);

    const authDatasource = new AuthDatasourceImpl();

    const authRepository = new AuthRepositoryImpl(authDatasource);

    const controller = new AuthController(authRepository);

    //* Routes
    router.post("/login", controller.login);
    router.post("/register", controller.register);

    //* Validate token route
    router.get("/validate-email/:token", controller.validateEmail);

    return router;
  }
}
