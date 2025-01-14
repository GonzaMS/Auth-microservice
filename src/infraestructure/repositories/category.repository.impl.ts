import {
  CategoryDatasource,
  CategoryRepository,
  CreateCategoryDto,
  PaginatedResult,
  PaginationDto,
} from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource) {}
  getAll(pagination: PaginationDto): Promise<PaginatedResult<CategoryEntity>> {
    return this.datasource.getAll(pagination);
  }

  create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.datasource.create(dto);
  }
}
