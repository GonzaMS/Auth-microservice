import { Request, Response } from "express";
import { CreateCategory } from "../../domain/use-case/category/create-category";
import {
  CategoryRepository,
  CreateCategoryDto,
  CustomError,
  GetCategories,
  PaginationDto,
} from "../../domain";

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const userId = req.body.user.id;

    const [error, createCategoryDto] = CreateCategoryDto.create({
      ...req.body,
      fk_user: userId,
    });

    if (error) return res.status(400).json({ error });

    new CreateCategory(this.categoryRepository)
      .execute(createCategoryDto!)
      .then((category) => res.json(category))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 5 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    new GetCategories(this.categoryRepository)
      .execute(paginationDto!)
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(error, res));
  };
}
