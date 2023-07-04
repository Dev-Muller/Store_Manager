// const schema = require('./validations/validationsProducts');
const { productModel } = require('../models');

const findAll = async () => {
  const product = await productModel.findAll();

  return product;
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) return { message: 'Product not found' };

  return product;
};

const createNewProduct = async (productDataObject) => {
  const name = productDataObject;

  const newProductId = await productModel.createNewProduct(name);
  console.log(newProductId);
  // const newProduct = await productModel.findById(newProductId);
  return newProductId;
};

module.exports = { findAll, findById, createNewProduct };