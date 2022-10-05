import UserModel from '../database/models/UserModel';
const { expect } = require('chai')

describe('Testa UserModel', () => {
  const user = new UserModel();  

  describe('Testa as propriedades corretas', () => {
    const userArray = ['id', 'username', 'role', 'email', 'password'];

    userArray.forEach((key) => {
      it('Testa se existe a propriedade', () => {
        expect(user).to.have.property(key);
      });
    });
    
  });
});