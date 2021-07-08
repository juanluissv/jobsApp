import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import db from '../../src/db';
import Server from '../../src/server';
import { Tag } from '../db.mock.json';

const tagExample = {
  name: 'Direccion',
  code: 'D',
};

describe('Tag Routes -  /api/v1/tags', () => {
  describe('GET "/"', () => {
    it('should return all the Tags', (done) => {
      request(Server)
        .get('/api/v1/tags')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).to.have.lengthOf(Tag.length);
          expect(response.body).to.deep.equal(Tag);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
  });
  describe('GET "/:id"', () => {
    it('should return the appropiate Tag', (done) => {
      db.Tag.findOne({ where: { name: Tag[0].name } }).then((foundTag) => {
        request(Server)
          .get(`/api/v1/tags/${foundTag.id}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).to.deep.include(Tag[0]);
          })
          .then(() => done())
          .catch((error) => done(error.message));
      });
    });
    it('should through an error if the id is not correct', (done) => {
      request(Server)
        .get(`/api/v1/tags/${Tag.length + 1}`)
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
        .get(`/api/v1/tags/${undefined}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('POST "/"', () => {
    it('should create a tag and return all tags', (done) => {
      request(Server)
        .post('/api/v1/tags/')
        .send(tagExample)
        .expect(200)
        .then((response) => {
          Tag.map((tag) => {
            expect(response.body).to.deep.include(tag);
          });
          expect(response.body).to.have.lengthOf(Tag.length + 1);

          return db.Tag.findOne({ where: { name: tagExample.name } });
        })
        .then((tag) => {
          Object.keys(tagExample).forEach((field) => {
            expect(tagExample[field]).to.equal(tag[field]);
          });
          return tag.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should not create a tag if no name is given', (done) => {
      request(Server)
        .post('/api/v1/tags/')
        .send({ ...tagExample, name: null })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Tag.findAll();
        })
        .then((tags) => {
          expect(tags).to.have.lengthOf(Tag.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should not create a tag if no code is given', (done) => {
      request(Server)
        .post('/api/v1/tags/')
        .send({ name: tagExample.name })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Tag.findAll();
        })
        .then((tags) => {
          expect(tags).to.have.lengthOf(Tag.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should not create a tag if the name already exists', (done) => {
      request(Server)
        .post('/api/v1/tags/')
        .send({ ...tagExample, name: Tag[0].name })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Tag.findAll();
        })
        .then((tags) => {
          expect(tags).to.have.lengthOf(Tag.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should not create a tag if the code already exists', (done) => {
      request(Server)
        .post('/api/v1/tags/')
        .send({ ...tagExample, code: Tag[0].code })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Tag.findAll();
        })
        .then((tags) => {
          expect(tags).to.have.lengthOf(Tag.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('DELETE "/:id"', () => {
    it('should delete a tag and return all tags', (done) => {
      db.Tag.create(tagExample).then((createdTag) => {
        request(Server)
          .delete(`/api/v1/tags/${createdTag.id}`)
          .expect(200)
          .then((response) => {
            Tag.map((tag) => {
              expect(response.body).to.deep.include(tag);
            });
            expect(response.body).to.not.deep.include(createdTag);
            expect(response.body).to.have.lengthOf(Tag.length);
          })
          .then(() => done())
          .catch((error) => {
            createdTag.destroy();
            done(error.message);
          });
      });
    });
    it('should return an error if a wrong id is given', (done) => {
      request(Server)
        .delete(`/api/v1/tags/${Tag.length + 1}`)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          done();
        })
        .catch((error) => done(error.message));
    });
    it('should through an error if the id is not given', (done) => {
      request(Server)
        .delete(`/api/v1/tags/${undefined}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
});
