import { PaginationModel } from "../../../app/common/pagination_model";
import Category from "../../entities/category";
import { ICategoryRepository } from "../../repositories/category.repository";

interface CategoryUseCase<T, P> {
  call(params: P): Promise<T>;
}

export class CreateCategoryUseCase
  implements CategoryUseCase<Category, Category>
{
  categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async call(params: Category) {
    return this.categoryRepository.createCategory(params);
  }
}

export class GetCategoriesUseCase
  implements CategoryUseCase<Category[], PaginationModel>
{
  categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async call(params: PaginationModel): Promise<Category[]> {
    return this.categoryRepository.getCategories(params);
  }
}

export class GetCategoryByIdUseCase
  implements CategoryUseCase<Category, string>
{
  categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async call(params: string): Promise<Category> {
    return this.categoryRepository.getCategoryByID(params);
  }
}

export class DeleteCategoryByIdUseCase
  implements CategoryUseCase<string, string>
{
  categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async call(params: string): Promise<string> {
    return this.categoryRepository.deleteCategoryByID(params);
  }
}

export class UpdateCategoryByIdUseCase
  implements CategoryUseCase<Category, Category>
{
  categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async call(params: Category): Promise<Category> {
    return this.categoryRepository.updateCategoryByID(params);
  }
}
