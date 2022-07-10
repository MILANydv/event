import { model, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = model("categories", CategorySchema);
export default Category;
