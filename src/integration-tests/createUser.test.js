const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

const app = require('../api/app');

chai.use(chaiHttp);

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    const validUser = {
      name: "Teste da alegria",
      password: "s3nh4",
      email: 'teste@teste.com',
    };

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

        response = await chai.request(app)
          .post('/users')
          .send(validUser);
    })

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" é um objeto', () => {
      expect(response.body.user).to.be.an('object');
    });

    it('o objeto "user" possui todas as propriedades', () => {
      expect(response.body.user).to.have.all.keys(["_id", "name", "email", "role"]);
    });
  });

  describe('quando não é criado', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    const invalidUser = {
      name: "Teste da alegria",
      password: "s3nh4",
    };

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

        response = await chai.request(app)
          .post('/users')
          .send(invalidUser);
    })

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property("message");
    });

    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
})