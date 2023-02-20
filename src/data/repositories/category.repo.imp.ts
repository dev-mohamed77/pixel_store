/* eslint-disable prefer-const */
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import Category from "../../domain/entities/category";
import { ApiError } from "../../app/utils/error_handler";
import { ICategoryDataSource } from "../data_source/interface/icategory.datasource";
import { AppConfig } from "../../app/config/config";
import { PaginationModel } from "../../app/common/pagination_model";

export class CategoryRepositoryImp implements ICategoryRepository {
  categoryDataSource: ICategoryDataSource;

  constructor(categoryDataSource: ICategoryDataSource) {
    this.categoryDataSource = categoryDataSource;
  }

  async createCategory(params: Category): Promise<Category> {
    if (!params.category_name_ar) {
      throw new ApiError(
        "category name ar is required",
        400,
        "category name ar is required"
      );
    }
    if (!params.category_name_en) {
      throw new ApiError(
        "category name en is required",
        400,
        "category name en is required"
      );
    }

    return this.categoryDataSource.createCategory(params);
  }

  async getCategories(params: PaginationModel): Promise<Category[]> {
    let perPage = Math.abs(params.pageSize) || AppConfig.PAGE_SIZE;
    let current_page = (Math.abs(params.page) || 1) - 1;

    return this.categoryDataSource.getCategories({
      pageSize: perPage,
      page: current_page,
    });
  }

  async getCategoryByID(id: string): Promise<Category> {
    if (!id) {
      throw new ApiError(
        "category id is required",
        400,
        "category id is required"
      );
    }
    return this.categoryDataSource.getCategoryByID(id);
  }

  async deleteCategoryByID(id: string): Promise<string> {
    if (!id) {
      throw new ApiError(
        "category id is required",
        400,
        "category id is required"
      );
    }

    return this.categoryDataSource.deleteCategoryByID(id);
  }

  async updateCategoryByID(params: Category): Promise<Category> {
    if (!params.category_id) {
      throw new ApiError(
        "category_id is required",
        400,
        "category_id is required"
      );
    }

    return this.categoryDataSource.updateCategoryByID(params);
  }
}
