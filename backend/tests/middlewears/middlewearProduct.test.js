const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const myMiddlewear = require('../../src/middlewares/productValidation');

describe('Realizando testes de middlewears', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('deve chamar next() se os dados forem validos', function () {
  const next = sinon.stub().returns();
  const req = { body: { name: 'ProdutoX' } };
  const res = {};

  myMiddlewear.productValidation(req, res, next);

  expect(next).to.have.been.calledWith();
  });

  it('deve retornar um erro 422 se o campo name for invalido', function () {
  const next = sinon.stub().returns();
  const req = { body: { name: '' } };
  const res = { status: sinon.stub().returnsThis(), json: sinon.stub().returnsThis() };

  myMiddlewear.productValidation(req, res, next);

  expect(res.status).to.have.been.calledWith(400);
  expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  expect(next).to.not.have.been.calledWith();
  });
});
