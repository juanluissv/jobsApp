import 'mocha';
import { expect } from 'chai';
import db from '../../src/db';
import { Job } from '../db.mock.json';
import JobController from '../../src/server/routes/jobs/controller';

const jobExample = {
  name: 'name',
  requirements: 'null',
  benefits: 'benefits',
  objectives: 'objectives',
  responsibilities: 'responsibilities',
  presency: 'full_presency',
  full_time: true,
  status: 'open',
  end_date: '2030-12-25',
  start_date: '2020-12-20',
  salary_range_low: 123123,
  salary_range_high: 123123,
  condition: 'volunteer',
  countryId: 2,
  tags: [],
};

describe('Jobs controller', () => {
  describe('method create', () => {
    it('should create a Job and return all', (done) => {
      JobController.create(jobExample, { pageSize: 20 })
        .then(({ totalCount, data }) => {
          expect(totalCount).to.equal(Job.length + 1);
          const createdJob = data[0];

          Object.keys(jobExample).forEach((field) => {
            if (field !== 'tags')
              expect(jobExample[field]).to.equal(createdJob[field]);
          });

          expect(createdJob).to.haveOwnProperty('country');
          expect(createdJob).to.haveOwnProperty('tags');
          createdJob.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should not create a job if name is null', (done) => {
      JobController.create({ ...jobExample, name: null }, { pageSize: 20 })
        .then(() => done('it was created'))
        .catch(() => done());
    });
  });

  describe('method update', () => {
    it('should update a Job and return all', (done) => {
      JobController.create(jobExample, { pageSize: 20 })
        .then(({ data }) => {
          const createdJob = data[0];

          return JobController.update(
            { ...createdJob, full_time: false },
            createdJob.id,
            { pageSize: 20 }
          );
        })
        .then(({ totalCount, data }) => {
          expect(totalCount).to.equal(Job.length + 1);
          const updateJob = data[0];

          Object.keys(jobExample).forEach((field) => {
            if (field !== 'tags' && field !== 'full_time')
              expect(jobExample[field]).to.equal(updateJob[field]);
          });

          expect(updateJob.full_time).to.not.equal(jobExample.full_time);
          expect(updateJob).to.haveOwnProperty('country');
          expect(updateJob).to.haveOwnProperty('tags');
          updateJob.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should not update a job if name is null', (done) => {
      db.Job.findOne({ where: { name: 'jefe' } })
        .then((existingJob) => {
          return JobController.update(
            { ...existingJob.dataValues, name: null, tags: [1] },
            existingJob.id,
            {
              pageSize: 20,
            }
          );
        })
        .then(() => done('it was updated'))
        .catch(() => done());
    });
    it('should not update a job if id is not given', (done) => {
      db.Job.findOne({ where: { name: 'jefe' } })
        .then((existingJob) => {
          return JobController.update(
            { ...existingJob.dataValues, Jobs: [1] },
            null,
            {
              pageSize: 20,
            }
          );
        })
        .then(() => done('it was updated'))
        .catch(() => done());
    });
    it('should not update a job if id doesent exist', (done) => {
      db.Job.findOne({ where: { name: 'jefe' } })
        .then((existingJob) => {
          return JobController.update(
            { ...existingJob.dataValues, tags: [1] },
            existingJob + 30,
            {
              pageSize: 20,
            }
          );
        })
        .then(() => done('it was updated'))
        .catch(() => done());
    });
  });

  describe('method getById', () => {
    it('Should return a job for the given id', (done) => {
      db.Job.create(jobExample)
        .then((job) => JobController.getById(job.id))
        .then((createdJob) => {
          Object.keys(jobExample).forEach((field) => {
            if (field !== 'tags')
              expect(jobExample[field]).to.equal(createdJob[field]);
          });
          expect(createdJob).to.haveOwnProperty('country');
          expect(createdJob).to.haveOwnProperty('tags');
          createdJob.destroy();
          done();
        })
        .catch((error) => done(error.message));
    });
    it('Should not find a job if id is null', (done) => {
      JobController.getById(null)
        .then(() => done('Should not find it'))
        .catch(() => done());
    });
    it('Should not find a job if id dosent exists', (done) => {
      JobController.getById(`${Job.length + 1}`)
        .then(() => done('It was found'))
        .catch(() => done());
    });
  });

  describe('method delete', () => {
    it('Should delete a job and return all', (done) => {
      db.Job.create(jobExample)
        .then((job) => JobController.delete(job.id, { pageSize: 30 }))
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(Job.length);
          done();
        })
        .catch((error) => done(error.message));
    });
    it('Should not delete a job if id dosent exist', (done) => {
      JobController.delete(`${Job.length + 1}`, { pageSize: 30 })
        .then(() => done('It was deleted'))
        .catch(() => done());
    });
    it('Should not delete a tag if id is null', (done) => {
      JobController.delete(null, { pageSize: 30 })
        .then(() => done('It was deleted'))
        .catch(() => done());
    });
  });

  describe('method filter', () => {
    let length;
    it('Should return the specify amount of pages', (done) => {
      const query = {
        page: 0,
        pageSize: 5,
      };
      JobController.filter(query)
        .then(({ data }) => {
          expect(data).to.have.lengthOf(query.pageSize);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should return the correct page', (done) => {
      const query = {
        page: 1,
        pageSize: 50,
      };
      JobController.filter(query)
        .then(({ data }) => {
          expect(data).to.have.lengthOf(0);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should filter by search', (done) => {
      const query = {
        search: 'ventas',
      };
      length = Job.filter(
        (job) =>
          job.name.includes(query.search) ||
          job.requirements.includes(query.search)
      ).length;

      JobController.filter(query)
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(length);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should filter by condition', (done) => {
      const query = {
        condition: 'volunteer',
      };
      length = Job.filter((job) => job.condition === query.condition).length;
      JobController.filter(query)
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(length);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should filter by presency', (done) => {
      const query = {
        presency: 'semi_presency',
      };
      length = Job.filter((job) => job.presency === query.presency).length;
      JobController.filter(query)
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(length);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should filter by condition', (done) => {
      const query = {
        full_time: 'false',
      };
      length = Job.filter((job) => job.full_time === false).length;
      JobController.filter(query)
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(length);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should filter by one countryId', (done) => {
      const query = {
        countryId: '2',
      };
      const array = query.countryId.split(',');
      length = Job.filter((job) => job.countryId === Number(array[0])).length;
      JobController.filter(query)
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(length);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should filter by multiple countryId', (done) => {
      const query = {
        countryId: '2,3',
      };
      const array = query.countryId.split(',');
      length = Job.filter(
        (job) =>
          job.countryId === Number(array[0]) ||
          job.countryId === Number(array[1])
      ).length;
      JobController.filter(query)
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(length);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should filter by every query', (done) => {
      const query = {
        search: 'postulation',
        countryId: '1',
        condition: 'volunteer',
        full_time: 'true',
        presency: 'full_presency',
      };

      length = Job.filter(
        (job) =>
          job.name.includes(query.search) ||
          job.requirements.includes(query.search)
      );
      length = length.filter((job) => job.condition === query.condition);
      length = length.filter(
        (job) => job.countryId === Number(query.countryId)
      );
      length = length.filter((job) => job.full_time === true);
      length = length.filter((job) => job.presency === query.presency).length;

      JobController.filter(query)
        .then(({ totalCount }) => {
          expect(totalCount).to.equal(length);
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Shuold return jobs order by Z-A if sortBy has name by argument', (done) => {
      const query = {
        sortBy: 'name',
      };
      JobController.filter(query)
        .then(({ data }) => {
          expect(data[0].name).to.equal('zireccion general');
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Shuold return jobs order by A-Z if sortBy has name by argument and sortFrom has ASC by argument', (done) => {
      const query = {
        sortBy: 'name',
        sortFrom: 'ASC',
      };
      JobController.filter(query)
        .then(({ data }) => {
          expect(data[0].name).to.equal('administracion');
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should return last created first if no query is sent', (done) => {
      db.Job.create(jobExample)
        .then(() => JobController.filter({}))
        .then(({ data }) => {
          const createdJob = data[0];

          Object.keys(jobExample).forEach((field) => {
            if (field !== 'tags')
              expect(jobExample[field]).to.equal(createdJob[field]);
          });

          expect(createdJob).to.haveOwnProperty('country');
          expect(createdJob).to.haveOwnProperty('tags');
          createdJob.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('should return last updated first if no query is sent', (done) => {
      let secondCreated;
      db.Job.create(jobExample)
        .then(() => db.Job.create(jobExample))
        .then((data) => {
          secondCreated = data;
          return db.Job.update(
            { name: 'lastUpdate' },
            { where: { id: data.id - 1 } }
          );
        })
        .then(() => JobController.filter({}))
        .then(({ data }) => {
          const createdJob = data[0];

          expect(createdJob.name).to.equal('lastUpdate');
          expect(createdJob).to.haveOwnProperty('country');
          expect(createdJob).to.haveOwnProperty('tags');
          createdJob.destroy();
          secondCreated.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
  });
});
