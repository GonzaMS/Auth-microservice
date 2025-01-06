import { Request, Response } from "express";

export class AuthController {
  //* DI
  constructor() {}

  register = (req: Request, res: Response) => {
    res.json("register");
  };

  login = (req: Request, res: Response) => {
    res.json("login");
  };

  validateEmail = (req: Request, res: Response) => {
    res.json("validate");
  };
}
