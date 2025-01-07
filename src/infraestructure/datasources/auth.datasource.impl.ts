import { bcryptAdapter, envs, jwtAdapter } from "../../config";
import {
  AuthDatasource,
  AuthResponse,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { prisma } from "../../data/postgres";
import { EmailSender } from "../../presentation/services/email.service";

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private readonly mailService: EmailSender) {}

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

      // Send mail
      await this.sendMailValidationLink(user.email);

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

  async sendMailValidationLink(email: string): Promise<boolean> {
    const token = jwtAdapter.generateToken({ email });

    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/v1/auth/validate-email/${token}`;

    const html = `
    <h1>Validate your email </h1>
    <p>Click on the following link to validate your email</p>
    <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSet = await this.mailService.sendEmail(options);
    if (!isSet) throw CustomError.internalServer("Error sending email");

    return true;
  }

  async validateEmail(token: string): Promise<boolean> {
    let payload;

    try {
      payload = jwtAdapter.validateToken(token);
    } catch (error) {
      throw CustomError.unauthorize("Invalid token");
    }

    if (!payload) throw CustomError.unauthorize("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw CustomError.internalServer("Email not exist");

    await prisma.user.update({
      where: { email },
      data: { emailValidated: true },
    });

    return true;
  }
}
