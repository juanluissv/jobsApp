import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import db from '../../src/db';
import Server from '../../src/server';
import { User, Job } from '../db.mock.json';
import UserJobModel from '../../src/db/models/UserJob.model';

const postulationExample = {
  similar_experience: 'Trabajae en desarrollo web',
  expected_salary: 30000,
  status: 'pending',
};

describe('UserJobs Routes - /api/v1/user_job', () => {
  describe('GET "/postulate/:userId/:jobId"', () => {
    it('should return the appropiate postulation acoording to the user and job id ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          return db.Job.findOne({
            where: { name: Job[Job.length - 1].name },
          }).then((jobFound) => {
            return db.UserJob.findOrCreate({
              where: {
                userId: userFound.id,
                jobId: jobFound.id,
              },
              defaults: {
                ...postulationExample,
                userId: userFound.id,
                jobId: jobFound.id,
              },
            }).then(([postulation]) => {
              request(Server)
                .get(
                  `/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`
                )
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                  expect(response.body.similar_experience).to.equal(
                    postulation.similar_experience
                  );
                  expect(response.body.expected_salary).to.equal(
                    postulation.expected_salary
                  );
                  expect(response.body.status).to.equal(postulation.status);
                  expect(response.body.userId).to.equal(postulation.userId);
                  expect(response.body.jobId).to.equal(postulation.jobId);
                  return postulation.destroy();
                })
                .then(() => done())
                .catch((error) => {
                  postulation.destroy();
                  done(error.message);
                });
            });
          });
        }
      );
    });
    it('should return an error if userId is incorrect ', (done) => {
      db.Job.findOne({
        where: { name: Job[Job.length - 1].name },
      }).then((jobFound) => {
        request(Server)
          .get(`/api/v1/user_job/postulate/test/${jobFound.id}`)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body?.errors).to.not.be.undefined;
          })
          .then(() => done())
          .catch((error) => done(error));
      });
    });
    it('should return an error if jobId is incorrect ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          request(Server)
            .get(`/api/v1/user_job/postulate/${userFound.id}/test`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        }
      );
    });
    it('should return an error if userId is undefined ', (done) => {
      db.Job.findOne({
        where: { name: Job[Job.length - 1].name },
      }).then((jobFound) => {
        request(Server)
          .get(`/api/v1/user_job/postulate/${undefined}/${jobFound.id}`)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body?.errors).to.not.be.undefined;
          })
          .then(() => done())
          .catch((error) => done(error));
      });
    });
    it('should return an error if jobId is undefined ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          request(Server)
            .get(`/api/v1/user_job/postulate/${userFound.id}/${undefined}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        }
      );
    });
  });
  describe('GET "/user_job/jobs/:userId"', () => {
    it('should return the appropiate postulation acoording to the user id ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          return db.Job.findOne({
            where: { name: Job[Job.length - 1].name },
          }).then((jobFound) => {
            return db.UserJob.findOrCreate({
              where: {
                userId: userFound.id,
                jobId: jobFound.id,
              },
              defaults: {
                ...postulationExample,
                userId: userFound.id,
                jobId: jobFound.id,
              },
            }).then(([postulation]) => {
              request(Server)
                .get(`/api/v1/user_job/jobs/${userFound.id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                  expect(response.body).to.haveOwnProperty('page');
                  expect(response.body).to.haveOwnProperty('totalCount');
                  expect(response.body.totalCount).to.be.at.least(1);
                  expect(response.body.data[0].similar_experience).to.equal(
                    postulation.similar_experience
                  );
                  expect(response.body.data[0].expected_salary).to.equal(
                    postulation.expected_salary
                  );
                  expect(response.body.data[0].status).to.equal(
                    postulation.status
                  );
                  expect(response.body.data[0].userId).to.equal(
                    postulation.userId
                  );
                  expect(response.body.data[0].jobId).to.equal(
                    postulation.jobId
                  );
                  return postulation.destroy();
                })
                .then(() => done())
                .catch((error) => {
                  postulation.destroy();
                  done(error.message);
                });
            });
          });
        }
      );
    });
    it('should return an error if userId is incorrect ', (done) => {
      request(Server)
        .get(`/api/v1/user_job/jobs/test`)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should return an error if userId is undefined ', (done) => {
      request(Server)
        .get(`/api/v1/user_job/jobs/${undefined}`)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('GET "/user_job/applicants/:jobId"', () => {
    it('should return the appropiates users acoording to the job id ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          return db.Job.findOne({
            where: { name: Job[Job.length - 1].name },
          }).then((jobFound) => {
            return db.UserJob.findOrCreate({
              where: {
                userId: userFound.id,
                jobId: jobFound.id,
              },
              defaults: {
                ...postulationExample,
                userId: userFound.id,
                jobId: jobFound.id,
              },
            }).then(([postulation]) => {
              request(Server)
                .get(`/api/v1/user_job/applicants/${jobFound.id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                  expect(response.body).to.haveOwnProperty('page');
                  expect(response.body).to.haveOwnProperty('totalCount');
                  expect(response.body.totalCount).to.be.at.least(1);
                  expect(response.body.data[0].similar_experience).to.equal(
                    postulation.similar_experience
                  );
                  expect(response.body.data[0].expected_salary).to.equal(
                    postulation.expected_salary
                  );
                  expect(response.body.data[0].status).to.equal(
                    postulation.status
                  );
                  expect(response.body.data[0].userId).to.equal(
                    postulation.userId
                  );
                  expect(response.body.data[0].jobId).to.equal(
                    postulation.jobId
                  );
                  return postulation.destroy();
                })
                .then(() => done())
                .catch((error) => {
                  postulation.destroy();
                  done(error.message);
                });
            });
          });
        }
      );
    });
    it('should return an error if jobId is incorrect ', (done) => {
      request(Server)
        .get(`/api/v1/user_job/applicants/test`)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
    it('should return an error if userId is undefined ', (done) => {
      request(Server)
        .get(`/api/v1/user_job/applicants/${undefined}`)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body?.errors).to.not.be.undefined;
        })
        .then(() => done())
        .catch((error) => done(error));
    });
  });
  describe('POST "/user_job/postulate/:userId/:jobId"', () => {
    it('should create the postulation with the data sent for the userId and jobId given ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          return db.Job.findOne({
            where: { name: Job[Job.length - 1].name },
          }).then((jobFound) => {
            request(Server)
              .post(`/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`)
              .send(postulationExample)
              .expect(200)
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body).to.haveOwnProperty('page');
                expect(response.body).to.haveOwnProperty('totalCount');
                expect(response.body.totalCount).to.be.at.least(1);
                expect(response.body.data[0].similar_experience).to.equal(
                  postulationExample.similar_experience
                );
                expect(response.body.data[0].expected_salary).to.equal(
                  postulationExample.expected_salary
                );
                expect(response.body.data[0].status).to.equal(
                  postulationExample.status
                );
                expect(response.body.data[0].userId).to.equal(userFound.id);
                expect(response.body.data[0].jobId).to.equal(jobFound.id);
                return db.UserJob.findOne({
                  where: { userId: userFound.id, jobId: jobFound.id },
                }).then((postulation) => postulation.destroy());
              })
              .then(() => done())
              .catch((error) => {
                done(error.message);
              });
          });
        }
      );
    });
    it('should return an error if userId is incorrect ', (done) => {
      db.Job.findOne({
        where: { name: Job[Job.length - 1].name },
      }).then((jobFound) => {
        request(Server)
          .post(`/api/v1/user_job/postulate/test/${jobFound.id}`)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body?.errors).to.not.be.undefined;
          })
          .then(() => done())
          .catch((error) => done(error));
      });
    });
    it('should return an error if userId is undefined ', (done) => {
      db.Job.findOne({
        where: { name: Job[Job.length - 1].name },
      }).then((jobFound) => {
        request(Server)
          .post(`/api/v1/user_job/postulate/${undefined}/${jobFound.id}`)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body?.errors).to.not.be.undefined;
          })
          .then(() => done())
          .catch((error) => done(error));
      });
    });
    it('should return an error if jobId is incorrect ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          request(Server)
            .post(`/api/v1/user_job/postulate/${userFound.id}/test`)
            .send(postulationExample)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        }
      );
    });
    it('should return an error if jobId is undefined ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          request(Server)
            .post(`/api/v1/user_job/postulate/${userFound.id}/${undefined}`)
            .send(postulationExample)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        }
      );
    });
  });
  it('should return an error if status is null ', (done) => {
    db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
      (userFound) => {
        return db.Job.findOne({
          where: { name: Job[Job.length - 1].name },
        }).then((jobFound) => {
          request(Server)
            .post(`/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`)
            .send({ ...postulationExample, status: null })
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        });
      }
    );
  });
  it('should return an error if expected_salary is null ', (done) => {
    db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
      (userFound) => {
        return db.Job.findOne({
          where: { name: Job[Job.length - 1].name },
        }).then((jobFound) => {
          request(Server)
            .post(`/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`)
            .send({ ...postulationExample, expected_salary: null })
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        });
      }
    );
  });
  it('should return an error if similar_experience is null ', (done) => {
    db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
      (userFound) => {
        return db.Job.findOne({
          where: { name: Job[Job.length - 1].name },
        }).then((jobFound) => {
          request(Server)
            .post(`/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`)
            .send({ ...postulationExample, similar_experience: null })
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        });
      }
    );
  });
  describe('PATCH "/user_job/postulate/:userId/:jobId"', () => {
    it('should update the postulation with the data sent for the userId and jobId given if status=pending', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          return db.Job.findOne({
            where: { name: Job[Job.length - 1].name },
          }).then((jobFound) => {
            return db.UserJob.findOrCreate({
              where: {
                userId: userFound.id,
                jobId: jobFound.id,
              },
              defaults: {
                ...postulationExample,
                userId: userFound.id,
                jobId: jobFound.id,
              },
            }).then(([postulation]) => {
              request(Server)
                .patch(
                  `/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`
                )
                .send({
                  ...postulationExample,
                  expected_salary: 400,
                  similar_experience: 'testExample',
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                  expect(response.body.similar_experience).to.equal(
                    'testExample'
                  );
                  expect(response.body.expected_salary).to.equal(400);
                  expect(response.body.status).to.equal('pending');
                  expect(response.body.userId).to.equal(postulation.userId);
                  expect(response.body.jobId).to.equal(postulation.jobId);
                  return postulation.destroy();
                })
                .then(() => done())
                .catch((error) => {
                  done(error.message);
                });
            });
          });
        }
      );
    });
    it('should not update the postulation is status!=pending ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          return db.Job.findOne({
            where: { name: Job[Job.length - 1].name },
          }).then((jobFound) => {
            return db.UserJob.findOrCreate({
              where: {
                userId: userFound.id,
                jobId: jobFound.id,
              },
              defaults: {
                ...postulationExample,
                status: 'rejected',
                userId: userFound.id,
                jobId: jobFound.id,
              },
            }).then(() => {
              request(Server)
                .patch(
                  `/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`
                )
                .send({
                  ...postulationExample,
                  expected_salary: 400,
                  similar_experience: 'testExample',
                })
                .expect('Content-Type', /json/)
                .then((response) => {
                  expect(response.body?.errors).to.not.be.undefined;
                })
                .then(() => done())
                .catch((error) => done(error));
            });
          });
        }
      );
    });
    it('should return an error if userId is incorrect ', (done) => {
      db.Job.findOne({
        where: { name: Job[Job.length - 1].name },
      }).then((jobFound) => {
        request(Server)
          .patch(`/api/v1/user_job/postulate/test/${jobFound.id}`)
          .send(postulationExample)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body?.errors).to.not.be.undefined;
          })
          .then(() => done())
          .catch((error) => done(error));
      });
    });
    it('should return an error if userId is undefined ', (done) => {
      db.Job.findOne({
        where: { name: Job[Job.length - 1].name },
      }).then((jobFound) => {
        request(Server)
          .patch(`/api/v1/user_job/postulate/${undefined}/${jobFound.id}`)
          .send(postulationExample)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body?.errors).to.not.be.undefined;
          })
          .then(() => done())
          .catch((error) => done(error));
      });
    });
    it('should return an error if jobId is incorrect ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          request(Server)
            .patch(`/api/v1/user_job/postulate/${userFound.id}/test`)
            .send(postulationExample)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        }
      );
    });
    it('should return an error if jobId is undefined ', (done) => {
      db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
        (userFound) => {
          request(Server)
            .patch(`/api/v1/user_job/postulate/${userFound.id}/${undefined}`)
            .send(postulationExample)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body?.errors).to.not.be.undefined;
            })
            .then(() => done())
            .catch((error) => done(error));
        }
      );
    });
  });
  it('should return an error if status is null ', (done) => {
    db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
      (userFound) => {
        return db.Job.findOne({
          where: { name: Job[Job.length - 1].name },
        }).then((jobFound) => {
          return db.UserJob.findOrCreate({
            where: {
              userId: userFound.id,
              jobId: jobFound.id,
            },
            defaults: {
              ...postulationExample,
              status: 'rejected',
              userId: userFound.id,
              jobId: jobFound.id,
            },
          }).then(() => {
            request(Server)
              .patch(
                `/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`
              )
              .send({ ...postulationExample, status: null })
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body?.errors).to.not.be.undefined;
              })
              .then(() => done())
              .catch((error) => done(error));
          });
        });
      }
    );
  });
  it('should return an error if expected_salary is null ', (done) => {
    db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
      (userFound) => {
        return db.Job.findOne({
          where: { name: Job[Job.length - 1].name },
        }).then((jobFound) => {
          return db.UserJob.findOrCreate({
            where: {
              userId: userFound.id,
              jobId: jobFound.id,
            },
            defaults: {
              ...postulationExample,
              status: 'rejected',
              userId: userFound.id,
              jobId: jobFound.id,
            },
          }).then(() => {
            request(Server)
              .patch(
                `/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`
              )
              .send({ ...postulationExample, expected_salary: null })
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body?.errors).to.not.be.undefined;
              })
              .then(() => done())
              .catch((error) => done(error));
          });
        });
      }
    );
  });
  it('should return an error if similar_experience is null ', (done) => {
    db.User.findOne({ where: { email: User[User.length - 1].email } }).then(
      (userFound) => {
        return db.Job.findOne({
          where: { name: Job[Job.length - 1].name },
        }).then((jobFound) => {
          return db.UserJob.findOrCreate({
            where: {
              userId: userFound.id,
              jobId: jobFound.id,
            },
            defaults: {
              ...postulationExample,
              status: 'rejected',
              userId: userFound.id,
              jobId: jobFound.id,
            },
          }).then(() => {
            request(Server)
              .patch(
                `/api/v1/user_job/postulate/${userFound.id}/${jobFound.id}`
              )
              .send({ ...postulationExample, similar_experience: null })
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body?.errors).to.not.be.undefined;
              })
              .then(() => done())
              .catch((error) => done(error));
          });
        });
      }
    );
  });
});
