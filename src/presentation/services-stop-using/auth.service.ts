import { bcryptAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    });

    if (existUser) throw CustomError.badRequest("User email already exist");

    try {
      const user = await prisma.user.create({
        data: {
          name: registerUserDto.name,
          email: registerUserDto.email,
          password: bcryptAdapter.hash(registerUserDto.password),
        },
      });

      //TODO: Generate JWT

      //TODO: Send email

      const { password, ...userInfo } = UserEntity.mapToEntity(user);

      return { user: userInfo, token: "abc" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!existUser) throw CustomError.badRequest("User email doesnt exist");

    try {
      const correctLogin = bcryptAdapter.compare(
        loginUserDto.password,
        existUser!.password
      );

      const { password, ...userInfo } = UserEntity.mapToEntity(existUser);

      return { user: userInfo, token: "abc" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
