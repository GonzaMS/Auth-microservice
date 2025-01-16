import { prisma } from "../../data/postgres";
import { CustomError, PaginatedResult, PaginationDto } from "../../domain";
import { ProductDatasource } from "../../domain/datasources/producto.datasource";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { ProductoEntity } from "../../domain/entities/product.entity.ys";

export class ProductDatasourceImpl implements ProductDatasource {
  async create(dto: CreateProductDto): Promise<ProductoEntity> {
    const existProduct = await prisma.product.findFirst({
      where: { name: dto.name },
    });

    if (existProduct) throw CustomError.badRequest("Product already exist");

    const existCategory = await prisma.category.findFirst({
      where: {
        id: dto.fk_category,
      },
    });

    console.log(existCategory);

    if (!existCategory) throw CustomError.badRequest("Category not found");

    const createProduct = await prisma.product.create({
      data: dto,
    });

    return ProductoEntity.mapToEntity(createProduct);
  }

  async getAll(
    pagination: PaginationDto
  ): Promise<PaginatedResult<ProductoEntity>> {
    const { page, limit } = pagination;

    const [totalProducts, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    if (!products) throw CustomError.internalServer("Error getting products");

    return {
      page,
      limit,
      totalPages: Math.ceil(totalProducts / limit),
      next:
        totalProducts > page * limit
          ? `/api/v1/products?page=${page + 1}&limit=${limit}`
          : undefined,
      prev:
        page > 1
          ? `/api/v1/products?page=${page - 1}&limit=${limit}`
          : undefined,

      products: products.map((product) => ProductoEntity.mapToEntity(product)),
    };
  }
}
