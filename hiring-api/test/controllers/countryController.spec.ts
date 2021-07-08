import 'mocha';
import { expect } from 'chai';
import db from '../../src/db';
import { Country } from '../db.mock.json';
import CountryController from '../../src/server/routes/countries/controller';

const countyExample = {
  name: 'Italia',
  code: 'IT',
};

describe('Country controllers', () => {
  describe('method getAll', () => {
    it('Should return all countries', (done) => {
      CountryController.getAll()
        .then((countries) => {
          expect(countries).to.have.lengthOf(Country.length);
          done();
        })
        .catch((error) => done(error.message));
    });
  });

  describe('method create', () => {
    it('Should create a country and return all', (done) => {
      CountryController.create(countyExample)
        .then((countries) => {
          const createdCountry = countries[countries.length - 1];

          expect(countries).to.have.lengthOf(Country.length + 1);

          Object.keys(countyExample).forEach((field) => {
            expect(countyExample[field]).to.equal(createdCountry[field]);
          });
          createdCountry.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not create a country if name is null', (done) => {
      CountryController.create({ ...countyExample, name: null })
        .then((countries) => {
          countries[countries.length - 1].destroy();
          done('It was created');
        })
        .catch(() => done());
    });
    it('Should not create a country if name is duplicate', (done) => {
      CountryController.create({ ...countyExample, name: Country[0].name })
        .then((countries) => {
          countries[countries.length - 1].destroy();
          done('It was created');
        })
        .catch(() => done());
    });
    it('Should not create a country if code is duplicate', (done) => {
      CountryController.create({ ...countyExample, code: Country[0].code })
        .then((countries) => {
          countries[countries.length - 1].destroy();
          done('It was created');
        })
        .catch(() => done());
    });
  });

  describe('method delete', () => {
    it('Should delete a country and return all', (done) => {
      db.Country.create(countyExample)
        .then((country) => CountryController.delete(country.id))
        .then((countries) => {
          expect(countries).to.have.lengthOf(Country.length);
          done();
        })
        .catch((error) => done(error.message));
    });
    it('Should not delete a country if id dosent exist', (done) => {
      CountryController.delete(`${Country.length + 1}`)
        .then(() => done('It was deleted'))
        .catch(() => done());
    });
    it('Should not delete a country if id is undefined', (done) => {
      CountryController.delete(undefined)
        .then(() => done('It was deleted'))
        .catch(() => done());
    });
  });
});
