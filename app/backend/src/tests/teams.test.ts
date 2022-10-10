import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/TeamModel';
import { app } from '../app';
import { teams } from './mocks/teams.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota de teams', () => {

  describe('Testa o retorno do endpoint GET', () => {

    before(async () => {
      sinon.stub(Team, 'findAll').resolves(teams as Team[]);
    });

    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Retorna status 200', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
    });

    it('Retorna o array dos times corretamente', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(teams);
    })

  });
});