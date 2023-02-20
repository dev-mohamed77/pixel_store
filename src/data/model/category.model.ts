import mongoose from "mongoose";
import Category from "../../domain/entities/category";

const categoryModel = new mongoose.Schema(
  {
    category_name_en: {
      type: String,
      require: true,
      unique: true,
    },
    category_name_ar: {
      type: String,
      require: true,
      unique: true,
    },
    category_image_url: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.category_id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export = mongoose.model<Category>("Category", categoryModel);
