const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const salesFromDB = require('../mocks/sales.mock');

describe('Realizando testes - salesController', function () {
  it('Deve retornar todos os objetos da db', async function () {
    sinon.stub(saleService, 'findAllSales').resolves(salesFromDB);

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.findAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDB);
  });
  it('Deve retornar um objeto com id e nome do produto', async function () {
    sinon.stub(saleService, 'findSalesById').resolves(salesFromDB[0]);

    const req = {};
    const res = {};

    req.params = { id: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.findSalesById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDB[0]);
  });
  it('Deve retornar um objeto com a mensagem de erro', async function () {
    sinon.stub(saleService, 'findSalesById').resolves({ message: 'Sale not found' });

    const req = {};
    const res = {};

    req.params = { id: 80 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.findSalesById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
  it('deve retornar uma nova sale', async function () {
    sinon.stub(saleService, 'createNewSale').resolves({ id: 1, productId: 1, quantity: 1 });

    const req = {};
    const res = {};

    req.body = { productId: 1, quantity: 1 };
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();

    await salesController.createNewSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, productId: 1, quantity: 1 });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});