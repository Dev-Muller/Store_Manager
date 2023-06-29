// const schema = require('./validations/validationsProducts');
const { productModel } = require('../models');

const findAll = async () => {
  const product = await productModel.findAll();

  return product;
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) return { message: 'Product not found' };

  // const newProductId = await productModel.insert(productDataObject);
  // const newProduct = await productModel.findById(newProductId);
  return product;
};

module.exports = { findAll, findById };