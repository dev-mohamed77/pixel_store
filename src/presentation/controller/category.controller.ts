/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import cloudinary_v2 from "../../app/utils/cloudinary";
import {
  CreateCategoryUseCase,
  DeleteCategoryByIdUseCase,
  GetCategoriesUseCase,
  GetCategoryByIdUseCase,
  UpdateCategoryByIdUseCase,
} from "../../domain/usecase/category/create_category_usecase";
import { CategoryRepositoryImp } from "../../data/repositories/category.repo.imp";
import CategoryDataSourceImp from "../../data/data_source/mongoDB/category.datasource";
import Logger from "../../app/utils/logger";
import current_date from "../../app/utils/current_date";
import { ApiError } from "../../app/utils/error_handler";

const logger = new Logger("Category");
const categoryDataSource = new CategoryDataSourceImp();
const categoryRepository = new CategoryRepositoryImp(categoryDataSource);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
const updateCategoryByIdUseCase = new UpdateCategoryByIdUseCase(
  categoryRepository
);
const deleteCategoryByIdUseCase = new DeleteCategoryByIdUseCase(
  categoryRepository
);

export const create = async (req: Request, res: Response) => {
  const category_name_ar = req.body.category_name_ar;
  const category_name_en = req.body.category_name_en;
  const category_image = req.file?.path;

  try {
    const image = await cloudinary_v2.uploader.upload(category_image!, {
      public_id: `${current_date()}__category`,
      folder: "Category",
    });

    const result = await createCategoryUseCase.call({
      category_name_ar: category_name_ar,
      category_name_en: category_name_en,
      category_image_url: image.url,
    });

    logger.infoWithObject("Category has been created successfully", result);

    res.status(200).json({
      status: true,
      message: "Category has been created successfully",
      result: result,
    });
  } catch (err) {
    logger.errorWithObject(err.message || "Error in create Category", err);
    res.status(err.statusCode || 500).json({
      status: false,
      result: err.message,
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const { page_size, page } = req.query;
  try {
    if (!page_size || !page) {
      const message = "page_size and page are required";
      throw new ApiError(message, 400, message);
    }

    const categories = await getCategoriesUseCase.call({
      pageSize: Number(page_size),
      page: Number(page),
    });

    logger.infoWithObject("Categories has been get successfully", categories);

    res.status(200).json({
      status: true,
      result: categories,
    });
  } catch (err) {
    logger.errorWithObject(err.message || "Error in get categories", err);
    res.status(err.statusCode || 500).json({
      status: false,
      result: err.message || "Error in get categories",
    });
  }
};

export const getCategoryByID = async (req: Request, res: Response) => {
  const category_id = req.params.category_id;
  try {
    const category = await getCategoryByIdUseCase.call(category_id);

    logger.infoWithObject("Category has been get successfully", category);

    res.status(200).json({
      status: true,
      result: category,
    });
  } catch (err) {
    logger.errorWithObject(err.message || "Error in get category by id", err);
    res.status(err.statusCode || 500).json({
      status: false,
      result: err.message || "Error in get category by id",
    });
  }
};

export const updateCategoryByID = async (req: Request, res: Response) => {
  const category_id = req.params.category_id;
  const category_name_ar = req.body.category_name_ar;
  const category_name_en = req.body.category_name_en;
  const category_image = req.file?.path;
  try {
    let image_url: string | undefined;

    if (category_image) {
      const image_update = await cloudinary_v2.uploader.upload(
        category_image!,
        {
          public_id: `${current_date()}__category`,
          folder: "Category",
        }
      );

      image_url = image_update.url;
    }

    const category = await updateCategoryByIdUseCase.call({
      category_id: category_id,
      category_name_ar: category_name_ar,
      category_name_en: category_name_en,
      category_image_url: image_url,
    });

    res.status(200).json({
      status: true,
      result: category,
    });
  } catch (err) {
    logger.errorWithObject(
      err.message || "Error in update category by id",
      err
    );
    res.status(err.statusCode || 500).json({
      status: false,
      result: err.message || "Error in update category by id",
    });
  }
};

export const deleteCategoryByID = async (req: Request, res: Response) => {
  const category_id = req.params.category_id;
  try {
    const category = await deleteCategoryByIdUseCase.call(category_id);

    logger.infoWithObject("Category has been delete successfully", category);

    res.status(200).json({
      status: true,
      result: category,
    });
  } catch (err) {
    logger.errorWithObject(
      err.message || "Error in delete category by id",
      err
    );
    res.status(err.statusCode || 500).json({
      status: false,
      result: err.message || "Error in delete category by id",
    });
  }
};
