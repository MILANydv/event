const { Category } = require("../models");
const express = require("express");
const router = express.Router();

/**
 * @description To Get event category
 * @api /categories/api/categories
 * @access private
 * @type GET
 */

router.get("/api/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    return res.status(200).json({
      categories,
      success: true,
      message: "Categories fetched successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unable to fetch categories.",
    });
  }
});

/**
 * @description To Add event category
 * @api /categories/api/add-category
 * @access private
 * @type POST
 */

router.post(
  "/api/add-category",

  async (req, res) => {
    try {
      // Create a new category
      let { body } = req;
      let category = new Category({
        ...body,
      });
      await category.save();
      return res.status(201).json({
        success: true,
        message: "Your category is published.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Unable to create the category.",
      });
    }
  }
);

export default router;
