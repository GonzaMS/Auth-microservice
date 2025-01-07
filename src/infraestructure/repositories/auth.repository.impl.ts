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

  register(registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    return this.datasource.register(registerUserDto);
  }

  login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    return this.datasource.login(loginUserDto);
  }
}
