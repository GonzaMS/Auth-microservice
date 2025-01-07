import { bcryptAdapter, jwtAdapter } from "../../config";
import {
  AuthDatasource,
  AuthResponse,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { prisma } from "../../data/postgres";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    });

    if (user) throw CustomError.badRequest("User email already exists");

    try {
      const hashedPassword = await bcryptAdapter.hash(registerUserDto.password);

      const user = await prisma.user.create({
        data: {
          name: registerUserDto.name,
          email: registerUserDto.email,
          password: hashedPassword,
        },
      });

      const { password, ...userInfo } = UserEntity.mapToEntity(user);

      const token = jwtAdapter.generateToken({ id: user.id }, "2h");
      if (!token)
        throw CustomError.internalServer("Error while generating token");

      return { user: userInfo, token };
    } catch (error) {
      throw CustomError.internalServer(
        `Error while registering user: ${error}`
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) throw CustomError.badRequest("User email doesnt exist");

    try {
      const correctLogin = bcryptAdapter.compare(
        loginUserDto.password,
        user!.password
      );

      if (!correctLogin)
        throw CustomError.badRequest("User or password incorrect");

      const { password, ...userInfo } = UserEntity.mapToEntity(user);

      const token = jwtAdapter.generateToken({ id: user.id }, "2h");
      if (!token)
        throw CustomError.internalServer("Error while generating token");

      return { user: userInfo, token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
