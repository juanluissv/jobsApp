import { expect } from 'chai';
import request from 'supertest';
import db from '../../../src/db';
import Server from '../../../src/server';
import { ExampleUser } from '../../db.mock.json';

xdescribe('DELETE /api/v1/exampleUser', () => {
  const testUser = {
    email: `test@mailForDelete.com`,
    firstName: `testForDelete`,
    lastName: `userForDelete`,
  };

  it('should delete a exampleUser', () =>
    db.ExampleUser.create(testUser).then((user) => {
      request(Server)
        .delete('/api/v1/exampleUser')
        .query({ pageSize: ExampleUser.length })
        .send({ id: user.id })
        .expect(200)
        .then((r) => {
          expect(r.body?.data).to.not.deep.include(testUser);
          return db.ExampleUser.findOne({ where: testUser });
        })
        .then((user) => expect(user).to.not.exist);
    }));

  it("should not delete a exampleUser if the 'id' was not passed", () =>
    request(Server)
      .delete('/api/v1/exampleUser')
      .query({ pageSize: ExampleUser.length })
      .send({})
      .expect(400)
      .then((r) => {
        expect(r.body?.errors?.[0]?.message).to.have.string('id');
        return db.ExampleUser.findAll();
      })
      .then((users) =>
        expect(JSON.parse(JSON.stringify(users))).to.be.deep.equal(ExampleUser)
      ));
});
