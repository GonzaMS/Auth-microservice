import { Role } from "@prisma/client";
import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly emialValidated: boolean,
    public readonly password: string,
    public readonly role: Role[],
    public readonly profile_picture?: string
  ) {}

  static mapToEntity(object: { [key: string]: any }): UserEntity {
    const { id, name, email, emialValidated, password, role, profile_picture } =
      object;

    if (!id) throw CustomError.badRequest("Missing id");

    if (!name) throw CustomError.badRequest("Missing name");

    if (!email) throw CustomError.badRequest("Missing emial");

    if (emialValidated === undefined)
      throw CustomError.badRequest("Missing email validated");

    if (!password) throw CustomError.badRequest("Missing password");

    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity(
      id,
      name,
      email,
      emialValidated,
      password,
      role,
      profile_picture
    );
  }
}

// We omit the password field from the UserEntity type
export type UserResponse = Omit<UserEntity, "password">;

// We define the AuthResponse type
export type AuthResponse = {
  user: UserResponse;
  token: string;
};
