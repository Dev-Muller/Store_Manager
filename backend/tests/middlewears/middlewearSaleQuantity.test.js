const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { validQuantity, quantityRequired, updateQuantity } = require('../../src/middlewares/quantityValidation');

describe('Teste das middlewares de validação de quantidade', function () {
  describe('Teste da middleware quantityRequired', function () {
    it('deve chamar a próxima função se todos os produtos possuem quantidade', function () {
      const req = {
        body: [
          { quantity: 1 },
          { quantity: 2 },
          { quantity: 3 },
        ],
      };
      const res = {};
      const next = sinon.spy();

      quantityRequired(req, res, next);
    });

    it('deve retornar um erro de status 400 se algum produto não possui quantidade', function () {
      const req = {
        body: [
          { quantity: 1 },
          { name: 'Product 2' },
          { quantity: 3 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      quantityRequired(req, res, next);

      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
    });
  });

  describe('Teste da middleware validQuantity', function () {
    it('deve retornar um erro de status 422 se alguma quantidade é inválida', function () {
      const req = {
        body: [
          { quantity: 1 },
          { quantity: -2 },
          { quantity: 3 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      validQuantity(req, res, next);

      expect(res.status).to.be.calledWith(422);
      expect(res.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('deve retornar um erro de status 422 se alguma quantidade não é um número', function () {
      const req = {
        body: [
          { quantity: 1 },
          { quantity: 'two' },
          { quantity: 3 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      validQuantity(req, res, next);

      expect(res.status).to.be.calledWith(422);
      expect(res.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('deve retornar um erro de status 422 se nao tiver quantity', async function () {
      const req = {
        body:
          { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      await updateQuantity(req, res, next);

      expect(res.status).to.be.calledWith(400);
    });

    it('deve retornar um erro de status 422 se quantity for um numero menor ou igual a zero', async function () {
      const req = {
        body:
          { quantity: 0 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      await updateQuantity(req, res, next);

      expect(res.status).to.be.calledWith(422);
    });

    it('deve retornar um erro de status 422 se quantity nao for um numero', async function () {
      const req = {
        body:
          { quantity: 'a' },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      await updateQuantity(req, res, next);

      expect(res.status).to.be.calledWith(422);
    });
  });
});