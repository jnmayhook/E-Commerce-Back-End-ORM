const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const productTagData = await Product.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
    try {
      const productTagData = await Product.findByPk(req.params.id, {
        include: [{ model: Product }]
      });
      if (!productTagData) {
        res.status(404).json({ message: 'No Product Tag found with that id!' });
        return;
      } 
      res.status(200).json(productTagData);
    } catch (err) {
      res.status(500).json(err);
    }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const productTagData = await Tag.create(req.body);
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const productTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const productTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productTagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
