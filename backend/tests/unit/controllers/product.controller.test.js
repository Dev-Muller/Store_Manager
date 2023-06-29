const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const productFromDB = require('../mocks/product.mock');

describe('Realizando testes - ProductController', function () {
  it('Deve retornar todos os objetos da db', async function () {
    sinon.stub(productService, 'findAll').resolves(productFromDB);

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await productController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromDB);
  });
  it('Deve retornar um objeto com id e nome do produto', async function () {
    sinon.stub(productService, 'findById').resolves(productFromDB[0]);

    const req = {};
    const res = {};

    req.params = { id: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromDB[0]);
  });
  it('Deve retornar um objeto com a mensagem de erro', async function () {
    sinon.stub(productService, 'findById').resolves({ message: 'Produto não encontrado' });

    const req = {};
    const res = {};

    req.params = { id: 80 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Produto não encontrado' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});