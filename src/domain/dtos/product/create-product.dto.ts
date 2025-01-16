export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly aviable: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly fk_user: number,
    public readonly fk_category: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    console.log(object);
    const {
      name,
      aviable = false,
      price,
      description,
      fk_user,
      fk_category,
    } = object;

    let aviableBoolean = aviable;

    if (!name) return ["Missing name"];

    if (typeof aviable !== "boolean") {
      aviableBoolean = aviable === "true";
    }

    if (!price) return ["Missing price"];

    if (!description) return ["Missing description"];

    if (!fk_user) return ["Missing user reference"];

    if (!fk_category) return ["Missing category reference"];

    return [
      undefined,
      new CreateProductDto(
        name,
        aviableBoolean,
        price,
        description,
        fk_user,
        fk_category
      ),
    ];
  }
}
