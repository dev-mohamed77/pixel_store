import { ICategoryDataSource } from "../interface/icategory.datasource";
import Category from "../../../domain/entities/category";
import CategoryModel from "../../model/category.model";
import { ApiError } from "../../../app/utils/error_handler";
import { PaginationModel } from "../../../app/common/pagination_model";

class CategoryDataSourceImp implements ICategoryDataSource {
  async createCategory(params: Category): Promise<Category> {
    const categoryNameCheck = await CategoryModel.findOne({
      category_name_en: params.category_name_en,
      category_name_ar: params.category_name_ar,
    });

    if (categoryNameCheck) {
      throw new ApiError(
        "Category name en or ar is exist ",
        400,
        "Category name en or ar is exist"
      );
    }

    const newCategory = new CategoryModel(params);

    const result = await newCategory.save();

    return result;
  }

  async getCategories(params: PaginationModel): Promise<Category[]> {
    return await CategoryModel.find()
      .limit(params.pageSize)
      .skip(params.pageSize * params.page);
  }

  async getCategoryByID(id: string): Promise<Category> {
    const result = await CategoryModel.findById(id);

    if (!result) {
      throw new ApiError("Category not exist", 400, "Category not exist");
    } else {
      return result;
    }
  }

  async deleteCategoryByID(id: string): Promise<string> {
    const result = await CategoryModel.findByIdAndDelete(id);

    if (result) {
      return "Category has been delete successfully";
    } else {
      throw new ApiError("Category not exist", 400, "Category not exist");
    }
  }
  async updateCategoryByID(params: Category): Promise<Category> {
    const result = await CategoryModel.findByIdAndUpdate(
      params.category_id,
      { $set: params },
      { new: true }
    );

    if (result) {
      return result;
    } else {
      throw new ApiError("Category not exist", 400, "Category not exist");
    }
  }
}

export = CategoryDataSourceImp;
