import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import db from '../../src/db';
import Server from '../../src/server';
import { Country } from '../db.mock.json';

const countryExample = {
  name: 'example',
  code: 'ex',
};

describe('Country Routes - /api/v1/countries', () => {
  describe('GET "/"', () => {
    it('should return all the countries', (done) => {
      request(Server)
        .get('/api/v1/countries')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).to.have.lengthOf(Country.length);
          expect(response.body).to.deep.equal(Country);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
  });
  describe('POST "/"', () => {
    it('should create a country and return all countries', (done) => {
      request(Server)
        .post('/api/v1/countries/')
        .send(countryExample)
        .expect(200)
        .then((response) => {
          Country.map((country) => {
            expect(response.body).to.deep.include(country);
          });
          expect(response.body).to.have.lengthOf(Country.length + 1);

          return db.Country.findOne({ where: { name: countryExample.name } });
        })
        .then((country) => {
          Object.keys(countryExample).forEach((field) => {
            expect(countryExample[field]).to.equal(country[field]);
          });
          return country.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should not create a country if no name is given', (done) => {
      request(Server)
        .post('/api/v1/countries/')
        .send({ ...countryExample, name: null })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Country.findAll();
        })
        .then((countries) => {
          expect(countries).to.have.lengthOf(Country.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should not create a country if the name already exists', (done) => {
      request(Server)
        .post('/api/v1/countries/')
        .send({ ...countryExample, name: Country[0].name })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Country.findAll();
        })
        .then((countries) => {
          expect(countries).to.have.lengthOf(Country.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should not create a country if the code already exists', (done) => {
      request(Server)
        .post('/api/v1/countries/')
        .send({ ...countryExample, code: Country[0].code })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Country.findAll();
        })
        .then((countries) => {
          expect(countries).to.have.lengthOf(Country.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('DELETE "/:id"', () => {
    it('should delete a country and return all countries', (done) => {
      db.Country.create(countryExample).then((createdCountry) => {
        request(Server)
          .delete(`/api/v1/countries/${createdCountry.id}`)
          .expect(200)
          .then((response) => {
            Country.map((country) => {
              expect(response.body).to.deep.include(country);
            });
            expect(response.body).to.not.deep.include(countryExample);
            expect(response.body).to.have.lengthOf(Country.length);
          })
          .then(() => done())
          .catch((error) => {
            createdCountry.destroy();
            done(error.message);
          });
      });
    });
    it('should return an error if a wrong id is given', (done) => {
      request(Server)
        .delete(`/api/v1/countries/test`)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Country.findAll();
        })
        .then((countries) => {
          expect(countries).to.have.lengthOf(Country.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should return an error if no id is given', (done) => {
      request(Server)
        .delete(`/api/v1/countries/${undefined}`)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Country.findAll();
        })
        .then((countries) => {
          expect(countries).to.have.lengthOf(Country.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
});
