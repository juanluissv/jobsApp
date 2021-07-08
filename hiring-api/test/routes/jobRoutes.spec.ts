import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import db from '../../src/db';
import Server from '../../src/server';
import { Job } from '../db.mock.json';
import { before } from 'mocha';

const jobRelatedQuerys = {
  countryId: 1,
  condition: 'volunteer',
  presency: 'full_presency',
  full_time: true,
};

const jobExample = {
  name: 'Ejemplo',
  requirements: 'Ejemplo',
  benefits: 'Ejemplo',
  objectives: 'Ejemplo',
  responsibilities: 'Ejemplo',
  start_date: '2020-06-07',
  end_date: '2030-06-04',
  status: 'open',
  full_time: false,
  presency: 'remote',
  salary_range_low: 100,
  salary_range_high: 300,
  condition: 'contract',
  countryId: 1,
  tags: [1, 2],
};

const orderQuery = { sortBy: 'id', sortFrom: 'ASC' };

describe('Job Routes - /api/v1/jobs', () => {
  describe('GET "/"', () => {
    it('should return all the jobs', (done) => {
      request(Server)
        .get('/api/v1/jobs')
        .query({ ...orderQuery, pageSize: 50 })
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.data).to.have.lengthOf(Job.length);
          Job.map((job, i) => {
            Object.keys(job).forEach((field) => {
              expect(job[field]).to.equal(response.body.data[i][field]);
            });
          });
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    Object.keys(jobRelatedQuerys).forEach((field) => {
      it(`should filtrate the jobs if '${field}' was passed`, (done) => {
        request(Server)
          .get('/api/v1/jobs')
          .query({ [field]: jobRelatedQuerys[field] })
          .expect(200)
          .then((response) => {
            response.body.data.map((job) => {
              expect(job[field]).to.be.equal(jobRelatedQuerys[field]);
            });
          })
          .then(() => done())
          .catch((error) => done(error.message));
      });
    });
    it(`should filtrate the jobs if 'page' was passed`, (done) => {
      request(Server)
        .get('/api/v1/jobs')
        .query({ page: 1, pageSize: 5, ...orderQuery })
        .expect(200)
        .then((response) => {
          expect(response.body.data[0]).to.deep.include(Job[5]);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it(`should filtrate the jobs if 'pageSize' was passed`, (done) => {
      request(Server)
        .get('/api/v1/jobs')
        .query({ pageSize: 5 })
        .expect(200)
        .then((response) => {
          expect(response.body.data).to.have.lengthOf(5);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it(`should filtrate the jobs if 'search' was passed`, (done) => {
      request(Server)
        .get('/api/v1/jobs')
        .query({ search: 'jefe' })
        .expect(200)
        .then((response) => {
          response.body.data.map((job) => {
            expect(job.name || job.requirements).to.have.string('jefe');
          });
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it(`should filtrate the jobs if 'sortBy' and 'sortFrom' was passed`, (done) => {
      request(Server)
        .get('/api/v1/jobs')
        .query({ ...orderQuery })
        .expect(200)
        .then((response) => {
          response.body.data.map((job, i) => {
            if (i < response.body.data.length - 1) {
              expect(job.id).to.be.lessThan(response.body.data[i + 1].id);
            }
          });
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it(`should filtrate the jobs if 'tags' were passed`, (done) => {
      request(Server)
        .get('/api/v1/jobs')
        .query({ tags: '1,2' })
        .expect(200)
        .then((response) => {
          expect(response.body.data).to.have.lengthOf(0);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it(`should filtrate the jobs if all queries were passed`, (done) => {
      request(Server)
        .get('/api/v1/jobs')
        .query({
          ...jobRelatedQuerys,
          ...orderQuery,
          page: 1,
          pageSize: 5,
          tags: '1,2',
        })
        .expect(200)
        .then((response) => {
          expect(response.body.data).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
  });
  describe('GET "/:id"', () => {
    it('should return the appropiate Job with its tags and country', (done) => {
      db.Job.findOne({ where: { name: Job[0].name } }).then((foundJob) => {
        request(Server)
          .get(`/api/v1/jobs/${foundJob.id}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).to.deep.include(Job[0]);
          })
          .then(() => done())
          .catch((error) => done(error.message));
      });
    });
    it('should through an error if the id is not correct', (done) => {
      request(Server)
        .get(`/api/v1/jobs/test`)
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
        .get(`/api/v1/jobs/${undefined}`)
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
    it('should create a job and return all jobs', (done) => {
      request(Server)
        .post('/api/v1/jobs/')
        .send(jobExample)
        .query({ pageSize: 50 })
        .expect(200)
        .then((response) => {
          expect(response.body.data).to.have.lengthOf(Job.length + 1);
          expect(response.body.data[0]).to.have.property('tags');

          return db.Job.findOne({ where: { name: jobExample.name } });
        })
        .then((job) => {
          Object.keys(jobExample).forEach((field) => {
            if (field != 'tags') {
              expect(jobExample[field]).to.equal(job[field]);
              job.destroy();
            }
          });
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it(`should not create a jobs if 'name' was not passed`, (done) => {
      request(Server)
        .post('/api/v1/jobs')
        .send({ ...jobExample, name: null })
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          return db.Job.findAll();
        })
        .then((jobs) => {
          expect(jobs).to.have.lengthOf(Job.length);
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('PUT "/:id"', () => {
    Object.keys(jobExample).forEach((field) => {
      let newValue;
      if (
        field === 'name' ||
        field === 'requirements' ||
        field === 'benefits' ||
        field === 'objectives' ||
        field === 'responsibilities'
      )
        newValue = 'exampleNewValue';
      if (field === 'start_date' || field === 'end_date')
        newValue = '2040-08-09';
      if (field === 'status') newValue = 'closed';
      if (field === 'full_time') newValue = true;
      if (field === 'presency') newValue = 'full_presency';
      if (field === 'salary_range_low' || field === 'salary_range_high')
        newValue = 200;
      if (field === 'condition') newValue = 'volunteer';
      if (field === 'countryId') newValue = 2;
      if (field === 'tags') return;

      it(`should update a jobs if '${field}' has a new value`, (done) => {
        db.Job.create(jobExample).then((jobCreated) => {
          request(Server)
            .put(`/api/v1/jobs/${jobCreated.id}`)
            .send({ ...jobExample, [field]: newValue })
            .query({ pageSize: 50 })
            .expect(200)
            .then((response) => {
              expect(response.body.data).to.have.lengthOf(Job.length + 1);
              return db.Job.findOne({ where: { id: jobCreated.id } });
            })
            .then((job) => {
              expect(job[field]).to.be.equal(newValue);
              return job.destroy();
            })
            .then(() => done())
            .catch((error) => {
              jobCreated.destroy();
              done(error.message);
            });
        });
      });
    });
    it('should return an error if a wrong id is given', (done) => {
      request(Server)
        .put(`/api/v1/jobs/test`)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          done();
        })
        .catch((error) => done(error.message));
    });
    it('should through an error if the id is not given', (done) => {
      request(Server)
        .put(`/api/v1/jobs/${undefined}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('DELETE "/:id"', () => {
    it('should delete a job and return all jobs', (done) => {
      db.Job.create(jobExample).then((jobCreated) => {
        request(Server)
          .delete(`/api/v1/jobs/${jobCreated.id}`)
          .query({ pageSize: 50 })
          .expect(200)
          .then((response) => {
            expect(response.body.data).to.not.deep.include(jobCreated);
            expect(response.body.data).to.have.lengthOf(Job.length);
          })
          .then(() => done())
          .catch((error) => {
            jobCreated.destroy();
            done(error.message);
          });
      });
    });
    it('should return an error if a wrong id is given', (done) => {
      request(Server)
        .delete(`/api/v1/jobs/test`)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
          done();
        })
        .catch((error) => done(error.message));
    });
    it('should through an error if the id is not given', (done) => {
      request(Server)
        .delete(`/api/v1/jobs/${undefined}`)
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
