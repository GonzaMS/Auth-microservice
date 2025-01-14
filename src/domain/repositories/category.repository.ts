import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { PaginatedResult } from "../dtos/shared/page.results.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { CategoryEntity } from "../entities/category.entity";

export abstract class CategoryRepository {
  abstract getAll(
    pagination: PaginationDto
  ): Promise<PaginatedResult<CategoryEntity>>;

  abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
}
