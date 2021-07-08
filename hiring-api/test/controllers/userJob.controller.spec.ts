import 'mocha';
import { expect } from 'chai';
import db from '../../src/db';
import UserJobController from '../../src/server/routes/userJob/controller';

const postulateExample = {
  similar_experience: 'Trabajae en desarrollo web',
  expected_salary: 30000,
  status: 'pending',
};

const userId = '1';
const jobId = '1';
const query = { page: 0, pageSize: 10 };

describe('UserJobs controller', () => {
  describe('method postulate', () => {
    it('Should create a postulation and return postulation with his job', (done) => {
      UserJobController.postulate(postulateExample, userId, jobId, query)
        .then(({ totalCount, data }) => {
          const postulateCreated = data[totalCount - 1].dataValues;

          Object.keys(postulateExample).forEach((field) => {
            expect(postulateCreated[field]).to.equal(postulateExample[field]);
          });

          expect(postulateCreated).to.haveOwnProperty('userId');
          expect(postulateCreated).to.haveOwnProperty('jobId');
          expect(postulateCreated).to.haveOwnProperty('job');
          expect(postulateCreated.userId).to.equal(Number(userId));
          expect(postulateCreated.jobId).to.equal(Number(jobId));
          data[totalCount - 1].destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not create a postulation when an user postulates twice to the same job', (done) => {
      let firstJob;
      db.UserJob.create({ ...postulateExample, userId, jobId })
        .then((data) => {
          firstJob = data;
          return UserJobController.postulate(
            postulateExample,
            userId,
            jobId,
            query
          );
        })
        .then(() => {
          firstJob.destroy();
          done('it was created');
        })
        .catch(() => {
          firstJob.destroy();
          done();
        });
    });
    it('should not create a postulation if expected_salary is null', (done) => {
      UserJobController.postulate(
        { ...postulateExample, expected_salary: null },
        userId,
        jobId,
        query
      )
        .then(({ totalCount, data }) => {
          data[totalCount - 1].destroy();
          done('it was created');
        })
        .catch(() => done());
    });
    it('should not create a postulation if similar_experience is null', (done) => {
      UserJobController.postulate(
        { ...postulateExample, similar_experience: null },
        userId,
        jobId,
        query
      )
        .then(({ totalCount, data }) => {
          data[totalCount - 1].destroy();
          done('it was created');
        })
        .catch(() => done());
    });
    it('should not create a postulation if userId dosent exist', (done) => {
      db.User.count()
        .then((usersCount) =>
          UserJobController.postulate(
            postulateExample,
            `${usersCount + 1}`,
            jobId,
            query
          )
        )
        .then(({ totalCount, data }) => {
          data[totalCount - 1].destroy();
          done('it was created');
        })
        .catch(() => done());
    });
    it('should not create a postulation if userId is not given', (done) => {
      UserJobController.postulate(postulateExample, undefined, jobId, query)
        .then(({ totalCount, data }) => {
          data[totalCount - 1].destroy();
          done('it was created');
        })
        .catch(() => done());
    });
    it('should not create a postulation if jobId dosent exist', (done) => {
      db.Job.count()
        .then((jobsCount) =>
          UserJobController.postulate(
            postulateExample,
            userId,
            `${jobsCount + 1}`,
            query
          )
        )
        .then(({ totalCount, data }) => {
          data[totalCount - 1].destroy();
          done('it was created');
        })
        .catch(() => done());
    });
    it('should not create a postulation if jobId is not given', (done) => {
      UserJobController.postulate(postulateExample, userId, undefined, query)
        .then(({ totalCount, data }) => {
          data[totalCount - 1].destroy();
          done('it was created');
        })
        .catch(() => done());
    });
  });

  describe('method getPostulantsByJobId', () => {
    it('Should return postulate info with userInfo if jobId is given', (done) => {
      let firstJob;
      db.UserJob.create({ ...postulateExample, userId, jobId })
        .then((data) => {
          firstJob = data;
          return UserJobController.getPostulantsByJobId(jobId, query);
        })
        .then(({ totalCount, data }) => {
          expect(totalCount).to.equal(1);
          const postulateFound = data[totalCount - 1].dataValues;

          Object.keys(postulateExample).forEach((field) => {
            expect(postulateFound[field]).to.equal(postulateExample[field]);
          });

          expect(postulateFound).to.haveOwnProperty('jobId');
          expect(postulateFound).to.haveOwnProperty('user');
          expect(postulateFound.jobId).to.equal(Number(jobId));
          firstJob.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not return postulate info with userInfo if jobId is not given', (done) => {
      UserJobController.getPostulantsByJobId(undefined, query)
        .then(() => done('it was found'))
        .catch(() => done());
    });
  });

  describe('method getJobsByUserId', () => {
    it('Should return postulate info with jobInfo if userId is given', (done) => {
      let firstJob;
      db.UserJob.create({ ...postulateExample, userId, jobId })
        .then((data) => {
          firstJob = data;
          return UserJobController.getJobsByUserId(userId, query);
        })
        .then(({ totalCount, data }) => {
          expect(totalCount).to.equal(1);
          const postulateFound = data[totalCount - 1].dataValues;

          Object.keys(postulateExample).forEach((field) => {
            expect(postulateFound[field]).to.equal(postulateExample[field]);
          });

          expect(postulateFound).to.haveOwnProperty('userId');
          expect(postulateFound).to.haveOwnProperty('job');
          expect(postulateFound.jobId).to.equal(Number(userId));
          firstJob.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not return postulate info with userInfo if jobId is not given', (done) => {
      UserJobController.getJobsByUserId(undefined, query)
        .then(() => done('it was found'))
        .catch(() => done());
    });
  });

  describe('method getPostulantInfo', () => {
    it('Should return postulate info', (done) => {
      let firstJob;
      db.UserJob.create({ ...postulateExample, userId, jobId })
        .then((data) => {
          firstJob = data;
          return UserJobController.getPostulantInfo(userId, jobId);
        })
        .then((info) => {
          const postulantInfo = info.dataValues;

          Object.keys(postulateExample).forEach((field) => {
            expect(postulantInfo[field]).to.equal(postulateExample[field]);
          });

          expect(postulantInfo).to.haveOwnProperty('userId');
          expect(postulantInfo).to.haveOwnProperty('jobId');
          expect(postulantInfo.userId).to.equal(Number(userId));
          expect(postulantInfo.jobId).to.equal(Number(jobId));
          firstJob.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not return postulate info if userId dosent exist', (done) => {
      UserJobController.getPostulantInfo(userId + 1, jobId)
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not return postulate info if jobId dosent exist', (done) => {
      UserJobController.getPostulantInfo(userId, jobId + 1)
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not return postulate info if userId is not give', (done) => {
      UserJobController.getPostulantInfo(undefined, jobId)
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not return postulate info if userId is not give', (done) => {
      UserJobController.getPostulantInfo(userId, undefined)
        .then(() => done('it was found'))
        .catch(() => done());
    });
  });

  describe('method updatePostulantInfo', () => {
    it('Should return postulate updated', (done) => {
      let firstJob;
      db.UserJob.create({ ...postulateExample, userId, jobId })
        .then((data) => {
          firstJob = data;
          return UserJobController.updatePostulantInfo(
            { ...postulateExample, expected_salary: 5 },
            userId,
            jobId
          );
        })
        .then((info) => {
          const postulantInfo = info.dataValues;

          Object.keys(postulateExample).forEach((field) => {
            if (field !== 'expected_salary')
              expect(postulantInfo[field]).to.equal(postulateExample[field]);
          });

          expect(postulantInfo).to.haveOwnProperty('userId');
          expect(postulantInfo).to.haveOwnProperty('jobId');
          expect(postulantInfo.userId).to.equal(Number(userId));
          expect(postulantInfo.jobId).to.equal(Number(jobId));
          expect(postulantInfo.expected_salary).to.not.equal(
            postulateExample.expected_salary
          );
          firstJob.destroy();
        })
        .then(() => done())
        .catch((error) => done(error.message));
    });
    it('Should not update if status isnt pending', (done) => {
      let firstJob;
      db.UserJob.create({
        ...postulateExample,
        userId,
        jobId,
        status: 'rejected',
      })
        .then((data) => {
          firstJob = data;
          return UserJobController.updatePostulantInfo(
            { ...postulateExample, expected_salary: 5 },
            userId,
            jobId
          );
        })
        .then(() => {
          firstJob.destroy();
          done('it was updated');
        })
        .catch(() => done());
    });
    it('Should not update if expected_salary is null', (done) => {
      UserJobController.updatePostulantInfo(
        { ...postulateExample, expected_salary: null },
        userId + 1,
        jobId
      )
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not update if similar_experience is null', (done) => {
      UserJobController.updatePostulantInfo(
        { ...postulateExample, similar_experience: null },
        userId + 1,
        jobId
      )
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not update if userId dosent exist', (done) => {
      UserJobController.updatePostulantInfo(
        { ...postulateExample, expected_salary: 5 },
        userId + 1,
        jobId
      )
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not update if jobId dosent exist', (done) => {
      UserJobController.updatePostulantInfo(
        { ...postulateExample, expected_salary: 5 },
        userId,
        jobId + 1
      )
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not update if userId is not give', (done) => {
      UserJobController.updatePostulantInfo(
        { ...postulateExample, expected_salary: 5 },
        undefined,
        jobId
      )
        .then(() => done('it was found'))
        .catch(() => done());
    });
    it('Should not update if userId is not give', (done) => {
      UserJobController.updatePostulantInfo(
        { ...postulateExample, expected_salary: 5 },
        userId,
        undefined
      )
        .then(() => done('it was found'))
        .catch(() => done());
    });
  });
});
