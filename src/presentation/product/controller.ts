import { CustomError, PaginationDto } from "../../domain";
import { ProductRepository } from "../../domain/repositories/product-repository";
import { Request, Response } from "express";
import { CreateProduct } from "../../domain/use-case/product/create-product";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { GetProducts } from "../../domain/use-case/product/get-product";

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const userId = req.body.user.id;
    const categoryId = req.body.fk_category;

    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      fk_category: categoryId,
      fk_user: userId,
    });

    if (error) return res.status(400).json({ error });

    new CreateProduct(this.productRepository)
      .execute(createProductDto!)
      .then((product) => res.json(product))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 5 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    new GetProducts(this.productRepository)
      .execute(paginationDto!)
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(error, res));
  };
}
