import { regularExps } from "../../../config";

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static register(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) ["Missing name"];
    if (!email) ["Missing email"];
    if (regularExps.email.test(email)) ["Invalid email"];

    if (!password) ["Missing password"];
    if (password.length < 6) ["Password is too short"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
