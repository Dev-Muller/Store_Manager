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
  return newProductId;
};

const updateProduct = async (id, name) => {
  const findId = await productModel.findById(id);

  if (!findId) {
    return {
      status: 404,
      data: {
        message: 'Product not found',
      },
    };
  }

  await productModel.updateProduct(id, name);

  return { status: 200, data: { id: +id, name } };
};

module.exports = { findAll, findById, createNewProduct, updateProduct };