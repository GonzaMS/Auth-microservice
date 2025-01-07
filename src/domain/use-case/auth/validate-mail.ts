import { RegisterUserDto } from "../../dtos/auth/register.dto";
import { AuthResponse, UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";

export interface ValidateEmailUseCase {
  execute(token: string): Promise<boolean>;
}

export class ValidateEmail implements ValidateEmailUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(token: string): Promise<boolean> {
    return this.repository.validateEmail(token);
  }
}
