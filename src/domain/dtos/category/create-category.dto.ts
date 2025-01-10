export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly aviable: boolean,
    public readonly fk_user: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, aviable = false, fk_user } = object;

    let aviableBoolean = aviable;

    if (!name) return ["Missing name"];

    if (!fk_user) return ["Missing user reference"];

    if (typeof aviable !== "boolean") {
      aviableBoolean = aviable === "true";
    }

    return [undefined, new CreateCategoryDto(name, aviableBoolean, fk_user)];
  }
}
