const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const productFromDB = require('../mocks/product.mock');

describe('Realizando testes - productModel', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Deve retornar todos os objetos com a chave "data" e o valor "product"', async function () {
    sinon.stub(connection, 'query').resolves(productFromDB);
    
    const product = await productModel.findAll();

    expect(product).to.be.an('array');
  });
  it('Deve retornar um objeto com a chave "data" e o valor "product"', async function () {
    sinon.stub(connection, 'query').resolves(productFromDB[0]);

    const product = await productModel.findById(1);
    
    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });
});