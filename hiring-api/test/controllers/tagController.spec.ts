import 'mocha';
import { expect } from 'chai';
import db from '../../src/db';
import { Tag } from '../db.mock.json';
import TagController from '../../src/server/routes/tags/controller';

const tagExample = {
  name: 'Direccion',
  code: 'D',
};

describe('Tag controllers', () => {
  describe('method getAll', () => {
    it('Should return all tags', (done) => {
      TagController.getAll()
        .then((tags) => {
          expect(tags).to.have.lengthOf(Tag.length);
          done();
        })
        .catch((error) => done(error.message));
    });
  });

  describe('method create', () => {
    it('Should create a tag and return all', (done) => {
      TagController.create(tagExample)
        .then((tags) => {
          const createdTag = tags[tags.length - 1];

          expect(tags).to.have.lengthOf(Tag.length + 1);

          Object.keys(tagExample).forEach((field) => {
            expect(tagExample[field]).to.equal(createdTag[field]);
          });
          createdTag.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not create a tag if name is null', (done) => {
      TagController.create({ ...tagExample, name: null })
        .then((tags) => {
          tags[tags.length - 1].destroy();
          done('It was created');
        })
        .catch(() => done());
    });
    it('Should not create a tag if name is duplicate', (done) => {
      TagController.create({ ...tagExample, name: Tag[0].name })
        .then((tags) => {
          tags[tags.length - 1].destroy();
          done('It was created');
        })
        .catch(() => done());
    });
    it('Should not create a tag if code is duplicate', (done) => {
      TagController.create({ ...tagExample, code: Tag[0].code })
        .then((tags) => {
          tags[tags.length - 1].destroy();
          done('It was created');
        })
        .catch(() => done());
    });
  });

  describe('method delete', () => {
    it('Should delete a tag and return all', (done) => {
      db.Tag.create(tagExample)
        .then((tag) => TagController.delete(tag.id))
        .then((tags) => {
          expect(tags).to.have.lengthOf(Tag.length);
          done();
        })
        .catch((error) => done(error.message));
    });
    it('Should not delete a tag if id dosent exist', (done) => {
      TagController.delete(`${Tag.length + 1}`)
        .then(() => done('It was deleted'))
        .catch(() => done());
    });
    it('Should not delete a tag if id is null', (done) => {
      TagController.delete(null)
        .then(() => done('It was deleted'))
        .catch(() => done());
    });
  });

  describe('method getById', () => {
    it('Should return a tag for the given id', (done) => {
      db.Tag.create(tagExample)
        .then((tag) => TagController.getById(tag.id))
        .then((tag) => {
          Object.keys(tagExample).forEach((field) => {
            expect(tagExample[field]).to.equal(tag[field]);
          });
          tag.destroy();
          done();
        })
        .catch((error) => done(error.message));
    });
    it('Should not find a tag if id is null', (done) => {
      TagController.getById(null)
        .then(() => done('Should not find it'))
        .catch(() => done());
    });
    it('Should not find a tag if id dosent exists', (done) => {
      TagController.getById(`${Tag.length + 1}`)
        .then(() => done('It was found'))
        .catch(() => done());
    });
  });
});
