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

  it('Deve retornar um objeto com o id e nome do produto criado', async function () {
    sinon.stub(productModel, 'createNewProduct').resolves(4);
    sinon.stub(productModel, 'findById').resolves({ id: 4, name: 'ProdutoX' });

    const product = await productService.createNewProduct('ProdutoX');

    expect(product).to.be.an('number');
  });

  it('deve retornar um array de objeto com o objeto atualizado', async function () {
    sinon.stub(productModel, 'updateProduct').resolves([productFromModel[0]]);

    const product = await productService.updateProduct(1, 'ProdutoX');
    
    expect(product).to.be.an('object');
  });
});
