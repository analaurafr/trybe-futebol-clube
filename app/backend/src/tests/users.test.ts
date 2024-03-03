import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserService from '../services/UserService';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para o endpoint /login', () => {
    afterEach(() => {
      sinon.restore(); 
    });
  
    it('Deve retornar erro ao tentar fazer login sem email ou senha', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({});
  
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message', 'All fields must be filled');
    });
  
    it('Deve retornar erro ao tentar fazer login com email ou senha inválidos', async () => {
      const userData = {
        email: 'invalid_email',
        password: 'short'
      };
  
      const response = await chai.request(app)
        .post('/login')
        .send(userData);
  
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('message', 'Invalid email or password');
    });
  });
