import db from '../../../db';

const {
  User,
  Job,
  UserJob,
  Sequelize: { Op },
} = db;

interface Postulation {
  status: string;
  expected_salary: number;
  similar_experience: string;
}

interface Queries {
  page?: number;
  pageSize?: number;
}

class UserJobController {
  postulate(
    data: Postulation,
    userId: string,
    jobId: string,
    { page = 0, pageSize = 10 }: Queries
  ): Promise<any> {
    return UserJob.findOrCreate({
      where: {
        userId,
        jobId,
      },
      defaults: { ...data, userId, jobId },
    })
      .then(([, created]) => {
        if (!created) {
          throw new Error('Ya te has postulado a este trabajo');
        }
      })
      .then(() => this.getJobsByUserId(userId, { page, pageSize }));
  }
  updatePostulantInfo(
    data: Postulation,
    userId: string,
    jobId: string
  ): Promise<any> {
    return UserJob.update(data, {
      where: {
        userId,
        jobId,
        status: 'pending',
      },
      returning: true,
      plain: true,
    }).then(([, info]) => {
      return info;
    });
  }
  getPostulantInfo(userId: string, jobId: string): Promise<any> {
    return UserJob.findOne({
      where: {
        userId,
        jobId,
      },
    }).then((info) => {
      if (info !== null) return info;
      throw new Error('User didnt apply this job');
    });
  }
  getJobsByUserId(
    userId: string,
    { page = 0, pageSize = 10 }: Queries
  ): Promise<any> {
    return UserJob.findAndCountAll({
      include: {
        model: Job,
      },
      where: {
        userId,
      },
      offset: page * pageSize,
      limit: pageSize,
    }).then(({ count, rows }) => ({
      page,
      totalCount: count,
      data: rows,
    }));
  }
  getPostulantsByJobId(
    jobId: string,
    { page = 0, pageSize = 10 }: Queries
  ): Promise<any> {
    return UserJob.findAndCountAll({
      where: {
        jobId,
      },
      include: [User, Job],
      offset: page * pageSize,
      limit: pageSize,
    }).then(({ count, rows }) => ({
      page,
      totalCount: count,
      data: rows,
    }));
  }
}
export default new UserJobController();
