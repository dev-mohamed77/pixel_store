import { PaginationModel } from "../../../app/common/pagination_model";
import Category from "../../../domain/entities/category";

export interface ICategoryDataSource {
  createCategory(params: Category): Promise<Category>;
  getCategories(params: PaginationModel): Promise<Category[]>;
  getCategoryByID(id: string): Promise<Category>;
  deleteCategoryByID(id: string): Promise<string>;
  updateCategoryByID(params: Category): Promise<Category>;
}
