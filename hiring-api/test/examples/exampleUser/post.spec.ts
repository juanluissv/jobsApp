import { expect } from 'chai';
import request from 'supertest';
import db from '../../../src/db';
import Server from '../../../src/server';
import { ExampleUser } from '../../db.mock.json';

xdescribe('POST /api/v1/exampleUser', () => {
  const testUser = {
    email: `newTest@mail.com`,
    firstName: `newTest`,
    lastName: `newUser`,
  };

  it('should create a new exampleUser', () =>
    request(Server)
      .post('/api/v1/exampleUser')
      .query({ pageSize: ExampleUser.length + 1 })
      .send(testUser)
      .expect(200)
      .then((r) => {
        expect(r.body?.data?.pop()).to.deep.include(testUser);
        return db.ExampleUser.findOne({ where: testUser });
      })
      .then((user) => {
        expect(user).to.deep.include(testUser);
        return user.destroy();
      }));

  Object.keys(testUser).forEach((field) => {
    it(`should not create a new exampleUser if the '${field}' was not passed`, () =>
      request(Server)
        .post('/api/v1/exampleUser')
        .query({ pageSize: ExampleUser.length + 1 })
        .send({ ...testUser, [field]: undefined })
        .expect(400)
        .then((r) => {
          expect(r.body?.errors?.[0]?.message).to.have.string(field);
          return db.ExampleUser.findOne({ where: testUser });
        })
        .then((user) => expect(user).to.not.exist));
  });
});
