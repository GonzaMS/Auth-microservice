import { PaginatedResult } from "../../dtos/shared/page.results.dto";
import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";

export interface GetCategoriesUseCase {
  execute(pagination: PaginationDto): Promise<PaginatedResult<CategoryEntity>>;
}

export class GetCategories implements GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(pagination: PaginationDto): Promise<PaginatedResult<CategoryEntity>> {
    return this.categoryRepository.getAll(pagination);
  }
}
