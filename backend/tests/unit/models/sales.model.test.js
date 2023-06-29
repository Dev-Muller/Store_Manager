const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const salesFromDB = require('../mocks/product.mock');

describe('Realizando testes - productModel', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Deve retornar um array de objetos contendo todas as sales', async function () {
    sinon.stub(connection, 'query').resolves(salesFromDB);
    
    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
  });
  it('Deve retornar um objeto de sales', async function () {
    sinon.stub(connection, 'query').resolves(salesFromDB[0]);

    const sales = await salesModel.findById(1);
    
    expect(sales).to.be.an('object');
    expect(sales).to.have.all.keys('id', 'date', 'productId', 'quantity');
  });
});