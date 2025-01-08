import { LoginUserDto } from "../../dtos/auth/login.dto";
import { AuthResponse } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";

export interface LoginUserUseCase {
  execute(dto: LoginUserDto): Promise<AuthResponse>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(dto: LoginUserDto): Promise<AuthResponse> {
    return this.repository.login(dto);
  }
}
