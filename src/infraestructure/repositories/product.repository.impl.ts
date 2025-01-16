import { PaginatedResult, PaginationDto } from "../../domain";
import { ProductDatasource } from "../../domain/datasources/producto.datasource";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { ProductoEntity } from "../../domain/entities/product.entity.ys";
import { ProductRepository } from "../../domain/repositories/product-repository";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly datasource: ProductDatasource) {}
  getAll(pagination: PaginationDto): Promise<PaginatedResult<ProductoEntity>> {
    return this.datasource.getAll(pagination);
  }

  create(dto: CreateProductDto): Promise<ProductoEntity> {
    return this.datasource.create(dto);
  }
}
