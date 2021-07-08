import { expect } from 'chai';
import request from 'supertest';
import Server from '../../../src/server';
import { ExampleUser } from '../../db.mock.json';

xdescribe('GET /api/v1/exampleUser', () => {
  it('should get the list of exampleUser', () =>
    request(Server)
      .get('/api/v1/exampleUser')
      .expect(200)
      .then((r) => {
        expect(r.body.page).to.be.equal(0);
        expect(r.body.totalCount).to.be.a('number');
        expect(r.body.data).to.be.deep.equal(ExampleUser.slice(0, 10));
      }));

  describe('should be paginated', () => {
    it('if `page` was pased in query, it must bring the appropriate page', () =>
      request(Server)
        .get('/api/v1/exampleUser')
        .query({ page: 1 })
        .expect('Content-Type', /json/)
        .then((r) => {
          expect(r.body.page).to.be.equal(1);
          expect(r.body.totalCount).to.be.equal(ExampleUser.length);
          expect(r.body.data).to.be.deep.equal(ExampleUser.slice(10, 20));
        }));

    it('if `pageSize` was pased in query, it must bring the appropriate amount', () =>
      request(Server)
        .get('/api/v1/exampleUser')
        .query({ pageSize: 7 })
        .expect('Content-Type', /json/)
        .then((r) => {
          expect(r.body.page).to.be.equal(0);
          expect(r.body.totalCount).to.be.equal(ExampleUser.length);
          expect(r.body.data).to.be.deep.equal(ExampleUser.slice(0, 7));
        }));
  });

  describe('should have a `search` query that searches for:', () => {
    it('email', () =>
      request(Server)
        .get(`/api/v1/exampleUser`)
        .query({ search: ExampleUser[0].email })
        .expect('Content-Type', /json/)
        .then((r) =>
          expect(r.body.data).to.be.deep.equal(
            ExampleUser.filter(({ email }) =>
              email.includes(ExampleUser[0].email)
            )
          )
        ));

    it('firstName', () =>
      request(Server)
        .get(`/api/v1/exampleUser`)
        .query({ search: ExampleUser[1].firstName })
        .expect('Content-Type', /json/)
        .then((r) =>
          expect(r.body.data).to.be.deep.equal(
            ExampleUser.filter(({ firstName }) =>
              firstName.includes(ExampleUser[1].firstName)
            )
          )
        ));

    it('lastName', () =>
      request(Server)
        .get(`/api/v1/exampleUser`)
        .query({ search: ExampleUser[2].lastName })
        .expect('Content-Type', /json/)
        .then((r) =>
          expect(r.body.data).to.be.deep.equal(
            ExampleUser.filter(({ lastName }) =>
              lastName.includes(ExampleUser[2].lastName)
            )
          )
        ));
  });
});
