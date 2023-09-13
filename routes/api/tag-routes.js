const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findAll({ include: Product });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const TagId = req.params.id;

  try {
    const data = await Tag.findByPk(TagId, { include: Product });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  const tagName = req.body.tag_name;

  try {
    const data = await Tag.create({ tag_name: tagName });
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const TagId = req.params.id;
    const { tag_name } = req.body; // To update tag name

    // Find the tag by ID
    const tag = await Tag.findByPk(TagId);

    if (!tag) {
      return res.status(404).json(err);
    }

    tag.tag_name = tag_name; // Updating the tag_name property

    // Save the updated tag
    await tag.save();

    res.json({ message: "Tag updated successfully", tag });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;

  try {
    await Tag.destroy({
      where: {
        id: tagId,
      },
    });
    res.json({});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
