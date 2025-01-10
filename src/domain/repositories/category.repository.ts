import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { UserEntity } from "../entities/user.entity";

export abstract class CategoryRepository {
  abstract getAll(): Promise<CategoryEntity[]>;

  abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
}
