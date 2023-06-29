const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const salesFromDB = require('../mocks/product.mock');

describe('Realizando testes - ProductController', function () {
  it('Deve retornar todos os objetos da db', async function () {
    sinon.stub(saleService, 'findAll').resolves(salesFromDB);

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDB);
  });
  it('Deve retornar um objeto com id e nome do produto', async function () {
    sinon.stub(saleService, 'findById').resolves(salesFromDB[0]);

    const req = {};
    const res = {};

    req.params = { id: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDB[0]);
  });
  it('Deve retornar um objeto com a mensagem de erro', async function () {
    sinon.stub(saleService, 'findById').resolves({ message: 'Sale not found' });

    const req = {};
    const res = {};

    req.params = { id: 80 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});