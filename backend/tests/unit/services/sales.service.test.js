const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const salesFromModel = require('../mocks/sales.mock');

describe('Realizando testes - saleService', function () {
  beforeEach(function () {
    sinon.restore();
  });
    it('Deve retornar um array de objetos', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesFromModel);

    const sales = await saleService.findAllSales();

    expect(sales).to.be.an('array');
  });
  it('Deve retornar um o id pedido', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves(salesFromModel[0]);

    const sales = await saleService.findSalesById(1);

    expect(sales).to.be.an('object');
    expect(sales).to.have.all.keys('date', 'id', 'productId', 'quantity');
  });
  it('Deve retornar uma mensagem de erro', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves([]);

    const sales = await saleService.findSalesById(1);

    expect(sales).to.be.an('object');
    expect(sales).to.have.all.keys('message');
  });
  it('retorna uma nova sale', async function () {
    sinon.stub(salesModel, 'createNewSale').resolves({ id: 1, productId: 1, quantity: 1 });

    const sale = await saleService.createNewSale([{ productId: 1, quantity: 1 }]);

    expect(sale).to.be.an('object');
    expect(sale).to.have.all.keys('id', 'itemsSold');
  });
});