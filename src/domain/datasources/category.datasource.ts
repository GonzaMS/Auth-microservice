import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { CategoryEntity } from "../entities/category.entity";

export abstract class CategoryDatasource {
  abstract getAll(): Promise<CategoryEntity[]>;

  abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
}
