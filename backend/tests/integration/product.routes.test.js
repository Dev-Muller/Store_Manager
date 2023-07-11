// const chai = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const chaiHttp = require('chai-http');
// const { connection } = require('../../src/models/connection');

// const app = require('../../src/app');

// const { expect } = chai;
// chai.use(sinonChai);
// chai.use(chaiHttp);

// describe('Realizando testes ponta a ponta da rota products', function () {
//   afterEach(function () {
//     sinon.restore();
//   });

  // it('testando a rota delete /products/:id', async function (done) {
  //   sinon.stub(connection, 'execute').resolves(undefined);
  //   const data = await chai.request(app)
  //     .delete('/products/1');
  //     // .then((err, res) => {
  //       // });
  //       expect(data.res).to.have.status(204);
  //       done();
  // });
// });