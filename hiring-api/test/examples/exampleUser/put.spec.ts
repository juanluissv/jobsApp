import { expect } from 'chai';
import request from 'supertest';
import db from '../../../src/db';
import Server from '../../../src/server';
import { ExampleUser } from '../../db.mock.json';

xdescribe('PUT /api/v1/exampleUser', () => {
  const testUser = {
    email: ExampleUser[0].email,
    firstName: ExampleUser[0].firstName,
    lastName: ExampleUser[0].lastName,
  };

  const editedTestUser = {
    id: 1,
    email: `edited${testUser.email}`,
    firstName: `editedTest${testUser.firstName}`,
    lastName: `editedUser${testUser.lastName}`,
  };

  it('should update a exampleUser', () =>
    request(Server)
      .put('/api/v1/exampleUser')
      .query({ pageSize: ExampleUser.length })
      .send(editedTestUser)
      .expect(200)
      .then((r) => {
        expect(r.body?.data?.pop()).to.deep.include(editedTestUser);
        return db.ExampleUser.findByPk(editedTestUser.id);
      })
      .then((user) => {
        expect(user).to.deep.include(editedTestUser);
        user.email = testUser.email;
        user.firstName = testUser.firstName;
        user.lastName = testUser.lastName;
        return user.save();
      }));

  Object.keys(testUser).forEach((field) => {
    it(`should not update the '${field}' if it was not passed`, () => {
      const expected = { ...editedTestUser, [field]: testUser[field] };
      return request(Server)
        .put('/api/v1/exampleUser')
        .query({ pageSize: ExampleUser.length })
        .send({ ...editedTestUser, [field]: undefined })
        .expect(200)
        .then((r) => {
          expect(r.body?.data?.pop()).to.deep.include(expected);
          return db.ExampleUser.findOne({ where: expected });
        })
        .then((user) => {
          expect(user).to.deep.include(expected);
          user.email = testUser.email;
          user.firstName = testUser.firstName;
          user.lastName = testUser.lastName;
          return user.save();
        });
    });
  });
});
