import { PaginationModel } from "../../app/common/pagination_model";
import Category from "../entities/category";

export interface ICategoryRepository {
  createCategory(params: Category): Promise<Category>;
  getCategories(params: PaginationModel): Promise<Category[]>;
  getCategoryByID(id: string): Promise<Category>;
  deleteCategoryByID(id: string): Promise<string>;
  updateCategoryByID(params: Category): Promise<Category>;
}
