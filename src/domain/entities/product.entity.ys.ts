import { CustomError } from "../errors/custom.error";

export class ProductoEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly aviable: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly fk_user: number,
    public readonly fk_category: number
  ) {}

  static mapToEntity(object: { [key: string]: any }): ProductoEntity {
    const { id, name, aviable, price, description, fk_user, fk_category } =
      object;

    if (!id) throw CustomError.badRequest("Missing id");

    if (!name) throw CustomError.badRequest("Missing name");

    if (!aviable) throw CustomError.badRequest("Missing aviable");

    if (aviable === undefined)
      throw CustomError.badRequest("Missing email validated");

    if (!price) throw CustomError.badRequest("Missing price");

    if (!description) throw CustomError.badRequest("Missing description");

    if (!fk_user) throw CustomError.badRequest("Missing user reference");

    return new ProductoEntity(
      id,
      name,
      aviable,
      price,
      description,
      fk_user,
      fk_category
    );
  }
}
