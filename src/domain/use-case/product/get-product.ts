import { PaginatedResult } from "../../dtos/shared/page.results.dto";
import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { ProductoEntity } from "../../entities/product.entity.ys";
import { ProductRepository } from "../../repositories/product-repository";

export interface GetProductUseCase {
  execute(pagination: PaginationDto): Promise<PaginatedResult<ProductoEntity>>;
}

export class GetProducts implements GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(pagination: PaginationDto): Promise<PaginatedResult<ProductoEntity>> {
    return this.productRepository.getAll(pagination);
  }
}
