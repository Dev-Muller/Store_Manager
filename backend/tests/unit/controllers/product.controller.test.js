const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { productFromDB } = require('../mocks/product.mocks');

describe('Realizando testes - ProductController', function () {
  it('Deve retornar todos os objetos com a chave "data" e o valor "produto"', async function () {
    sinon.stub(productService, 'findAll').resolves({ status: 'SUCCESSFUL', data: 'produto' });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findAll();
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productFromDB);
  });
  it('Deve retornar um objeto com a chave "data" e o valor "produto"', async function () {
    sinon.stub(productService, 'findById').resolves({ status: 'SUCCESSFUL', data: 'produto' });

    const req = { params: { id: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productFromDB[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});