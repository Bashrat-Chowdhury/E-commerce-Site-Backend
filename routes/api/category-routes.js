const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({ include: Product });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;

  try {
    const data = await Category.findByPk(categoryId, { include: Product });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const { category_name } = req.body;
    const newCategory = await Category.create({
      category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = req.params.id;
    const { category_name } = req.body; // To update category name

    // Find the category by ID
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ message: "No category found with this id!" });
    }

    category.category_name = category_name; // Updating the category_name property

    // Save the updated category
    await category.save();

    res.json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;

  try {
    await Category.destroy({
      where: {
        id: categoryId,
      },
    });
    res.json({});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
