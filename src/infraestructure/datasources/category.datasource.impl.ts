import { prisma } from "../../data/postgres";
import {
  CategoryDatasource,
  CreateCategoryDto,
  CustomError,
} from "../../domain";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryDatasourceImpl implements CategoryDatasource {
  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const existCategory = await prisma.category.findFirst({
      where: { name: dto.name },
    });

    if (existCategory) throw CustomError.badRequest("Category already exist");

    const createCategory = await prisma.category.create({
      data: dto,
    });

    return CategoryEntity.mapToEntity(createCategory);
  }

  async getAll(): Promise<CategoryEntity[]> {
    const categoryList = await prisma.category.findMany();

    return categoryList.map(
      (category): CategoryEntity => CategoryEntity.mapToEntity(category)
    );
  }
}
