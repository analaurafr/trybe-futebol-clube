import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import matchMocks from './mocks/matches.mock';
import Matches from '../database/models/SequelizeMatch';
import userMock from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration Test for Match', () => {
  beforeEach(function () {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('should return all the Matches - GET /matches', async () => {
    const { allMatches } = matchMocks;

    sinon.stub(Matches, 'findAll').resolves(allMatches as any);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allMatches);
  });

  it('should return all the Matches in progress - GET /matches?inProgress=true', async () => {
    const { mactchesInProgress } = matchMocks;

    sinon.stub(Matches, 'findAll').resolves(mactchesInProgress as any);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mactchesInProgress);
  })

  it('should return all the Matches finished - GET /matches?inProgress=false', async () => {
    const { allMatches, mactchesInProgress } = matchMocks;

    const finishedMatches = allMatches.filter(match => !mactchesInProgress.includes(match));

    sinon.stub(Matches, 'findAll').resolves(finishedMatches as any);

    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(finishedMatches);
  })

  it('should update a match score - PATCH /matches/:id', async () => {

    const firstBuild = Matches.build({
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
    });

    const secondBuild = Matches.build({
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 3,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
    });

    sinon.stub(Matches, 'findByPk').onFirstCall().resolves(firstBuild).onSecondCall().resolves(Matches.build(secondBuild));
    sinon.stub(Matches, 'update').resolves([1]);

    const response = await chai.request(app)
      .patch('/matches/2')
      .set('Authorization', `Bearer ${userMock.token}`)
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 })

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Score updated' });
  })

  it('should update a match progress - PATCH /matches/:id/finish', async () => {

    const firstBuild = Matches.build({
      "id": 41,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
    });

    const secondBuild = Matches.build({
      "id": 41,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": true,
    });

    sinon.stub(Matches, 'findByPk').onFirstCall().resolves(firstBuild).onSecondCall().resolves(Matches.build(secondBuild));
    sinon.stub(Matches, 'update').resolves([1]);

    const response = await chai.request(app)
      .patch('/matches/41/finish')
      .set('Authorization', `Bearer ${userMock.token}`)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  })

  it('should create a match - POST /matches', async () => {
    const match = {
      homeTeamId: 8,
      awayTeamId: 3,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    }

    const createdMatch = {
      id: 50,
      homeTeamId: 8,
      homeTeamGoals: 2,
      awayTeamId: 3,
      awayTeamGoals: 2,
      inProgress: true
    }
    sinon.stub(Matches, 'create').resolves(createdMatch as any);

    const response = await chai.request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${userMock.token}`)
      .send(match)

    expect(response.body).to.be.deep.equal(createdMatch);
  })
});
