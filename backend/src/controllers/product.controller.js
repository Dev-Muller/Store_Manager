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

const createNewProduct = async (req, res) => {
  const { name } = req.body;

  const data = await productService.createNewProduct(name);
  
  return res.status(201).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { status, data } = await productService.updateProduct(id, name);

  return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productService.deleteProduct(id);

  return res.status(status).json(data);
};

const searchProduct = async (req, res) => {
  const { q: name } = req.query;

  const { status, data } = await productService.searchProduct(name);

  return res.status(status).json(data);
};

module.exports = {
  findAll, findById, createNewProduct, updateProduct, deleteProduct, searchProduct };