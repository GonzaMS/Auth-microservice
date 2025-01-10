import { CustomError } from "../errors/custom.error";

export class CategoryEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly aviable: boolean,
    public readonly fk_user: number
  ) {}

  static mapToEntity(object: { [key: string]: any }): CategoryEntity {
    const { id, name, aviable, fk_user } = object;

    if (!id) throw CustomError.badRequest("Missing id");

    if (!name) throw CustomError.badRequest("Missing name");

    if (!aviable) throw CustomError.badRequest("Missing aviable");

    if (aviable === undefined)
      throw CustomError.badRequest("Missing email validated");

    if (!fk_user) throw CustomError.badRequest("Missing user reference");
    if (fk_user === undefined)
      throw CustomError.badRequest("Missing user reference");

    return new CategoryEntity(id, name, aviable, fk_user);
  }
}
