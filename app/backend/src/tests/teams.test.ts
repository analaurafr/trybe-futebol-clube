import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeamModel from '../database/models/SequelizeTeam';
import { teams, teamId } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('requisições', () => {
  afterEach(function () {
    sinon.restore();
  })
  it('deve retornar todos os times', async function() {
    sinon.stub(SequelizeTeamModel, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  
  it('deve retornar time por id', async function() {
    sinon.stub(SequelizeTeamModel, 'findByPk').resolves(teamId as any);

    const { status, body } = await chai.request(app).get('/teams/12');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamId);
  });

  it('deve retornar erro ao buscar time que não existe', async function() {
    sinon.stub(SequelizeTeamModel, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/77');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 77 not found!');
  });
});