import { QueryInterface } from 'sequelize/types';
import db from '../..';

const pickRandomTags = ([...tags]: typeof db.Tag[], amount: number) => {
  if (tags.length === 0 || amount > tags.length) return [];

  const randomTags = [];
  while (amount--) {
    const index = Math.floor(Math.random() * tags.length);
    randomTags.push(tags[index]);
    tags.splice(index, 1);
  }
  return randomTags;
};

export async function up(queryInterface: QueryInterface): Promise<unknown> {
  const jobs = (await db.Job.findAll()).map(({ id }) => id);
  const tags = (await db.Tag.findAll()).map(({ id }) => id);
  const jobTags = jobs.map((id) => {
    const randomTags = pickRandomTags(tags, 3);
    const jobTags = randomTags.map((tagId) => ({
      job_id: id,
      tag_id: tagId,
      created_at: new Date(),
      updated_at: new Date(),
    }));
    return jobTags;
  });
  return await queryInterface.bulkInsert('job_tags', jobTags.flat());
}

export async function down(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkDelete('tags', null, {});
}
