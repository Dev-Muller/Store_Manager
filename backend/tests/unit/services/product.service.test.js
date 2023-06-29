const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
// const { productFromModel } = require('../mocks/product.mock');

describe('Realizando testes - productService', function () {
  it('Deve retornar todos os objetos com a chave "data" e o valor "product"', async function () {
    sinon.stub(productModel, 'findAll').resolves({ status: 'SUCCESSFUL', data: 'product' });

    const product = await productService.findAll();

    expect(product).to.be.deep.equal({ status: 'SUCCESSFUL', data: 'product' });
  });
  it('Deve retornar um objeto com a chave "data" e o valor "product"', async function () {
    sinon.stub(productModel, 'findById').resolves({ status: 'SUCCESSFUL', data: 'product' });

    const product = await productService.findById(1);

    expect(product).to.be.deep.equal({ status: 'SUCCESSFUL', data: 'product' });
  });
});
