import db from '../../../db';
const {
  Sequelize: { Op },
} = db;
import filterHandler from './filtersHandler';

const { Job, Country, Tag } = db;

interface Job {
  name: string;
  requirements: string;
  benefits: string;
  objectives: string;
  responsibilities: string;
  status: string;
  full_time: boolean;
  presency: string;
  end_date?: string;
  start_date: string;
  salary_range_low: number;
  salary_range_high: number;
  condition: string;
  countryId: number;
  tags: number[];
}

interface Query {
  page?: number;
  pageSize?: number;
  search?: string;
  countryId?: string;
  condition?: string;
  presency?: string;
  full_time?: string;
  sortBy?: any;
  sortFrom?: string;
  tags?: string;
  closed_jobs?: string;
}

class JobController {
  create(
    {
      name,
      requirements,
      benefits,
      objectives,
      responsibilities,
      status,
      full_time,
      presency,
      end_date,
      start_date,
      salary_range_low,
      salary_range_high,
      condition,
      countryId,
      tags,
    }: Job,
    query: Query
  ): Promise<any> {
    return Job.create({
      name,
      requirements,
      benefits,
      objectives,
      responsibilities,
      status,
      full_time,
      presency,
      end_date,
      start_date,
      salary_range_low,
      salary_range_high,
      condition,
      countryId,
    })
      .then((job) => job.setTags(tags))
      .then(() => this.filter(query));
  }
  filter({
    page = 0,
    pageSize = 8,
    search = '',
    countryId = '',
    condition = '',
    presency = '',
    full_time = '',
    sortBy = 'updatedAt',
    sortFrom = 'DESC',
    tags = '',
    closed_jobs = 'false',
  }: Query): Promise<any> {
    if (sortBy === '') sortBy = 'updatedAt';
    if (sortFrom === '') sortFrom = 'DESC';
    if (sortBy === 'countryId') {
      sortBy = [{ model: Country, as: 'country' }, 'name'];
    } else sortBy = [sortBy];
    const filters: any = filterHandler(
      search,
      countryId,
      condition,
      presency,
      full_time,
      closed_jobs
    );
    return Job.findAndCountAll({
      distinct: true,
      where: {
        ...filters,
      },
      include: [
        Country,
        {
          model: Tag,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          where: tags && { id: { [Op.or]: tags.split(',') } },
          through: {
            attributes: {
              exclude: ['jobId', 'tagId', 'createdAt', 'updatedAt'],
            },
          },
        },
      ],
      order: [[...sortBy, sortFrom]],
      offset: page * pageSize,
      limit: pageSize,
    }).then(({ count, rows }) => ({
      page,
      totalCount: count,
      data: rows,
    }));
  }
  update(
    {
      name,
      requirements,
      benefits,
      objectives,
      responsibilities,
      status,
      full_time,
      presency,
      end_date,
      start_date,
      salary_range_low,
      salary_range_high,
      condition,
      countryId,
      tags,
    }: Job,
    id: string,
    query: Query
  ): Promise<any> {
    return Job.update(
      {
        name,
        requirements,
        benefits,
        objectives,
        responsibilities,
        status,
        full_time,
        presency,
        end_date,
        start_date,
        salary_range_low,
        salary_range_high,
        condition,
        countryId,
      },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    )
      .then(([, job]) => job.setTags(tags))
      .then(() => this.filter(query));
  }
  delete(id: string, query: Query): Promise<any> {
    return Job.destroy({ where: { id } }).then((deleted) => {
      if (deleted > 0) return this.filter(query);
      throw new Error('Job not found');
    });
  }
  getById(id: string): Promise<any> {
    return Job.findOne({
      include: [
        Country,
        {
          model: Tag,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          through: {
            attributes: {
              exclude: ['jobId', 'tagId', 'createdAt', 'updatedAt'],
            },
          },
        },
      ],
      where: {
        id: Number(id),
      },
    }).then((job) => {
      if (job !== null) return job;
      throw new Error('Job not found');
    });
  }
}
export default new JobController();
