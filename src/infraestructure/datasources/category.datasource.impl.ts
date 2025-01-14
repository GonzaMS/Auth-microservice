import { prisma } from "../../data/postgres";
import {
  CategoryDatasource,
  CreateCategoryDto,
  CustomError,
  PaginatedResult,
  PaginationDto,
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

  async getAll(
    pagination: PaginationDto
  ): Promise<PaginatedResult<CategoryEntity>> {
    const { page, limit } = pagination;

    const [totalCategories, categories] = await Promise.all([
      prisma.category.count(),
      prisma.category.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    if (!totalCategories) throw CustomError.notFound("Categories not found");

    if (!categories)
      throw CustomError.internalServer("Error getting categories");

    return {
      page,
      limit,
      totalPages: Math.ceil(totalCategories / limit),
      next:
        totalCategories > page * limit
          ? `/api/v1/category?page=${page + 1}&limit=${limit}`
          : undefined,
      prev:
        page > 1
          ? `/api/v1/category?page=${page - 1}&limit=${limit}`
          : undefined,

      categories: categories.map((category) =>
        CategoryEntity.mapToEntity(category)
      ),
    };
  }
}
