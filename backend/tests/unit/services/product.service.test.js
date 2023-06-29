const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const productFromModel = require('../mocks/product.mock');

describe('Realizando testes - productService', function () {
  beforeEach(function () {
    sinon.restore();
  });
    it('Deve retornar um array de objetos', async function () {
    sinon.stub(productModel, 'findAll').resolves(productFromModel);

    const product = await productService.findAll();

    expect(product).to.be.an('array');
  });
  it('Deve retornar um o id pedido', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromModel[0]);

    const product = await productService.findById(1);

    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });
  it('Deve retornar uma mensagem de erro', async function () {
    sinon.stub(productModel, 'findById').resolves(null);

    const product = await productService.findById(1);

    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('message');
  });
});
