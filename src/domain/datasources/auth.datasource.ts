import { LoginUserDto } from "../dtos/auth/login.dto";
import { RegisterUserDto } from "../dtos/auth/register.dto";
import { AuthResponse } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<AuthResponse>;

  abstract login(loginUserDto: LoginUserDto): Promise<AuthResponse>;

  abstract validateEmail(token: string): Promise<boolean>;
}
