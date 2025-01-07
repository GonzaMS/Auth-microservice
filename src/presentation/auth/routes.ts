import { Router } from "express";
import { AuthController } from "./controller";
import { EmailSender } from "../services/email.service";
import { envs } from "../../config/envs";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infraestructure";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailSender(
      envs.MAIL_SERVICE,
      envs.MAIL,
      envs.SECRET
    );

    const authDatasource = new AuthDatasourceImpl(emailService);

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
