const { productService } = require('../services');
// const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const data = await productService.findAll();
  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const data = await productService.findById(+id);

  if (data.message) {
    return res.status(404).json(data);
  }

  return res.status(200).json(data);
};

module.exports = { findAll, findById };