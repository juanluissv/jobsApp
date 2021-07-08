import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import db from '../../src/db';
import Server from '../../src/server';

const exampleUser = {
  email: 'example@example.com',
  firstName: 'name',
  lastName: 'lastname',
  birthDate: '1994-12-01',
  education: 'Me forme como stack developer en henry',
  phone: '5555555',
  techo_experience: false,
  nationality: 'Argentina',
  residence: 'Argentina',
  linkedin: 'https://miurl.com/',
  habilities: 'Good at team work',
  identity_number: '39912141',
  identity_type: 'D.N.I',
};

describe('User Routes - /api/v1/users', () => {
  describe('GET "/:id"', () => {
    it('should return the appropiate User ', (done) => {
      db.User.create(exampleUser).then((userCreated) => {
        request(Server)
          .get(`/api/v1/users/${userCreated.id}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((response) => {
            Object.keys(exampleUser).forEach((field) => {
              expect(exampleUser[field]).to.equal(response.body[field]);
            });
            return userCreated.destroy();
          })
          .then(() => done())
          .catch((error) => {
            userCreated.destroy();
            done(error.message);
          });
      });
    });
    it('should through an error if the id is not correct', (done) => {
      request(Server)
        .get(`/api/v1/users/test`)
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should through an error if the id is not given', (done) => {
      request(Server)
        .get(`/api/v1/users/${undefined}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('PUT "/:id"', () => {
    Object.keys(exampleUser).forEach((field) => {
      let newValue;
      if (
        field === 'firstName' ||
        field === 'lastName' ||
        field === 'education' ||
        field === 'phone' ||
        field === 'nationality' ||
        field === 'residence' ||
        field === 'habilities' ||
        field === 'identity_number' ||
        field === 'identity_type'
      )
        newValue = 'exampleNewValue';
      if (field === 'birthDate') newValue = '1995-09-04';
      if (field === 'linkedin') newValue = 'https://miNuevaUrl.com/';
      if (field === 'techo_experience') newValue = true;
      if (field === 'email') return;

      it(`should update a user if '${field}' has a new value`, (done) => {
        db.User.create(exampleUser).then((userCreated) => {
          request(Server)
            .put(`/api/v1/users/${userCreated.id}`)
            .send({ ...exampleUser, [field]: newValue })
            .expect(200)
            .then((response) => {
              expect(response.body[field]).to.be.equal(newValue);
              return userCreated.destroy();
            })
            .then(() => done())
            .catch((error) => {
              userCreated.destroy();
              done(error.message);
            });
        });
      });
    });
    it('should return an error if a wrong id is given', (done) => {
      request(Server)
        .put(`/api/v1/users/444`)
        .send(exampleUser)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should through an error if the id is not given', (done) => {
      request(Server)
        .put(`/api/v1/users/${undefined}`)
        .send(exampleUser)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('PATCH "/:id"', () => {
    it(`should update a user if a new value is sent`, (done) => {
      db.User.create(exampleUser).then((userCreated) => {
        request(Server)
          .patch(`/api/v1/users/${userCreated.id}`)
          .send({ firstName: 'newValue' })
          .expect(200)
          .then((response) => {
            expect(response.body.firstName).to.be.equal('newValue');
            return userCreated.destroy();
          })
          .then(() => done())
          .catch((error) => {
            userCreated.destroy();
            done(error.message);
          });
      });
    });
    it('should return an error if a wrong id is given', (done) => {
      request(Server)
        .patch(`/api/v1/users/444`)
        .send(exampleUser)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should through an error if the id is not given', (done) => {
      request(Server)
        .patch(`/api/v1/users/${undefined}`)
        .send(exampleUser)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
});
