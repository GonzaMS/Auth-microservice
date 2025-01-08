import { RegisterUserDto } from "../../dtos/auth/register.dto";
import { AuthResponse } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";

export interface RegisterUserUseCase {
  execute(dto: RegisterUserDto): Promise<AuthResponse>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(dto: RegisterUserDto): Promise<AuthResponse> {
    return this.repository.register(dto);
  }
}
