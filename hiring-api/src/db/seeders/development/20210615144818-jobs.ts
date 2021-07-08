import { QueryInterface } from 'sequelize';
import { jobs } from '../data/jobs';

import faker from 'faker';
import db from '../..';

export async function up(queryInterface: QueryInterface): Promise<unknown> {
  const countries = await db.Country.findAll();
  return await queryInterface.bulkInsert(
    'jobs',
    jobs.map((job) => ({
      ...job,
      country_id: faker.random.arrayElement(countries).id,
    }))
  );
}

export async function down(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkDelete('jobs', null, {});
}
