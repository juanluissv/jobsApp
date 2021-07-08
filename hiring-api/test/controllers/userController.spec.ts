import 'mocha';
import { expect } from 'chai';
import db from '../../src/db';
import { User } from '../db.mock.json';
import userController from '../../src/server/routes/users/controller';

const userExample = {
  firstName: 'name',
  birthDate: '1994-12-01',
  lastName: 'lastname',
  education: 'Me forme como stack developer en henry',
  techo_experience: false,
  nationality: 'Argentina',
  residence: 'Argentina',
  habilities: 'Good at team work',
  linkedin: 'https://miurl.com/',
  identity_number: '39912141',
  identity_type: 'D.N.I',
};

describe('User controllers', () => {
  describe('method update', () => {
    it('Should update a user', (done) => {
      db.User.findOne({
        where: { email: User[0].email },
      })
        .then((user) => userController.update(userExample, user.id))
        .then((updatedUser) => {
          Object.keys(userExample).forEach((field) => {
            expect(updatedUser[1][field]).to.equal(userExample[field]);
          });
          expect(updatedUser[1].email).to.equal(User[0].email);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not update an user if id dosent exist', (done) => {
      userController
        .update(userExample, `${User.length + 1}`)
        .then(() => done('it was updated'))
        .catch(() => done());
    });
    it('Should not update an user if id is undefined', (done) => {
      userController
        .update(userExample, undefined)
        .then(() => done('it was updated'))
        .catch(() => done());
    });
  });

  describe('method getById', () => {
    it('Should return a user for the given id', (done) => {
      db.User.create({ ...userExample, id: 12, email: 'test12@mail.com' })
        .then((user) => userController.getById(user.id))
        .then((createdUser) => {
          Object.keys(userExample).forEach((field) => {
            expect(userExample[field]).to.equal(createdUser[field]);
          });
          expect(createdUser).to.haveOwnProperty('jobs');
          createdUser.destroy();
          done();
        })
        .catch((error) => done(error.message));
    });
    it('Should not find a user if id is undefined', (done) => {
      userController
        .getById(undefined)
        .then(() => done('It was found'))
        .catch(() => done());
    });
    it('Should not find a user if id dosent exists', (done) => {
      userController
        .getById(`${User.length + 1}`)
        .then(() => done('It was found'))
        .catch(() => done());
    });
  });
});
