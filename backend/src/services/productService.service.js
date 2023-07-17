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

const deleteProduct = async (id) => {
  const findId = await productModel.findById(id);

  if (!findId) {
    return {
      status: 404,
      data: {
        message: 'Product not found',
      },
    };
  }

  await productModel.deleteProduct(id);

  return { status: 204, data: {} };
};

const searchProduct = async (name) => {
  const product = await productModel.findAll();

  const filter = product.filter((item) => item.name.includes(name));

  if (!filter) return { status: 200, data: product };

  return { status: 200, data: filter };
};

module.exports = {
  findAll, findById, createNewProduct, updateProduct, deleteProduct, searchProduct };