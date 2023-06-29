const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const salesFromModel = require('../mocks/product.mock');

describe('Realizando testes - productService', function () {
  beforeEach(function () {
    sinon.restore();
  });
    it('Deve retornar um array de objetos', async function () {
    sinon.stub(salesFromModel, 'findAll').resolves(salesFromModel);

    const sales = await saleService.findAll();

    expect(sales).to.be.an('array');
  });
  it('Deve retornar um o id pedido', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesFromModel[0]);

    const sales = await saleService.findById(1);

    expect(sales).to.be.an('object');
    expect(sales).to.have.all.keys('date', 'productId', 'quantity');
  });
  it('Deve retornar uma mensagem de erro', async function () {
    sinon.stub(salesModel, 'findById').resolves(null);

    const sales = await saleService.findById(1);

    expect(sales).to.be.an('object');
    expect(sales).to.have.all.keys('message');
  });
});