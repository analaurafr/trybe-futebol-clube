import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatch';
import { app } from '../app';
import { allMatches, matchesInProgress } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches tests', () => {

    afterEach(() => {
        sinon.restore()
      });

    it('deve retornar todas as partidas', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    
        const { status, body } = await chai.request(app).get('/matches');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(allMatches);
      });

      it('deve retornar todas as partidas filtradas pelo progresso', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgress as any);
    
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesInProgress);
      });

});
