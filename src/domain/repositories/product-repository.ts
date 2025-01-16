import { CreateProductDto } from "../dtos/product/create-product.dto";
import { PaginatedResult } from "../dtos/shared/page.results.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { ProductoEntity } from "../entities/product.entity.ys";

export abstract class ProductRepository {
  abstract getAll(
    pagination: PaginationDto
  ): Promise<PaginatedResult<ProductoEntity>>;

  abstract create(dto: CreateProductDto): Promise<ProductoEntity>;
}
