import { CreateCategoryDto } from "../../dtos/category/create-category.dto";
import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";

export interface CreateCategoryUseCase {
  execute(dto: CreateCategoryDto): Promise<CategoryEntity>;
}

export class CreateCategory implements CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryRepository.create(dto);
  }
}
