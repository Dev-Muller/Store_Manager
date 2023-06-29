// const schema = require('./validations/validationsProducts');
const { productModel } = require('../models');

const findAll = async () => {
  const product = await productModel.findAll();

  return { status: 'SUCCESSFUL', data: product };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  // const newProductId = await productModel.insert(productDataObject);
  // const newProduct = await productModel.findById(newProductId);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = { findAll, findById };