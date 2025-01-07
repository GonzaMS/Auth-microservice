import {
  AuthDatasource,
  AuthRepository,
  AuthResponse,
  LoginUserDto,
  RegisterUserDto,
  UserResponse,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly datasource: AuthDatasource) {}
  validateEmail(token: string): Promise<boolean> {
    return this.datasource.validateEmail(token);
  }

  register(registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    return this.datasource.register(registerUserDto);
  }

  login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    return this.datasource.login(loginUserDto);
  }
}
