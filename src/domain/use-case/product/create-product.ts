import { CreateProductDto } from "../../dtos/product/create-product.dto";
import { ProductoEntity } from "../../entities/product.entity.ys";
import { ProductRepository } from "../../repositories/product-repository";

export interface CreateProductUseCase {
  execute(dto: CreateProductDto): Promise<ProductoEntity>;
}

export class CreateProduct implements CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(dto: CreateProductDto): Promise<ProductoEntity> {
    return this.productRepository.create(dto);
  }
}
