import * as chai from 'chai';
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from "../database/models/UserModel";

chai.use(chaiHttp);

describe('Testa o login', () => {
  const userData = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
  
  describe('Testa com o usuário cadastrado', () => {
    it('Retorna status 200 e um token', async () => {
      Sinon.stub(User, 'findOne').resolves(userData as User);

      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.have.property('token');
    });
  });
});
