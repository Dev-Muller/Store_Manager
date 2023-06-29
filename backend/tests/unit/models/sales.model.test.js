const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const salesFromDB = require('../mocks/sales.mock');

describe('Realizando testes - salesModel', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Deve retornar um array de objetos contendo todas as sales', async function () {
    sinon.stub(connection, 'query').resolves(salesFromDB);
    
    const sales = await salesModel.findAllSales();

    expect(sales).to.be.an('array');
  });
  it('Deve retornar um objeto de sales', async function () {
    sinon.stub(connection, 'query').resolves(salesFromDB[0]);

    const sales = await salesModel.findSalesById(1);
    
    expect(sales).to.be.an('array');
    expect(sales[0]).to.have.all.keys('date', 'productId', 'quantity');
  });
});