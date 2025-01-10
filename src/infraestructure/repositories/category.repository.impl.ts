import {
  CategoryDatasource,
  CategoryRepository,
  CreateCategoryDto,
} from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource) {}
  create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.datasource.create(dto);
  }

  getAll(): Promise<CategoryEntity[]> {
    return this.datasource.getAll();
  }
}
