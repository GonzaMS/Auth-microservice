import { LoginUserDto } from "../dtos/auth/login.dto";
import { RegisterUserDto } from "../dtos/auth/register.dto";
import { AuthResponse, UserResponse } from "../entities/user.entity";

export abstract class AuthRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<AuthResponse>;

  abstract login(loginUserDto: LoginUserDto): Promise<AuthResponse>;

  //   abstract validateEmail()
}
