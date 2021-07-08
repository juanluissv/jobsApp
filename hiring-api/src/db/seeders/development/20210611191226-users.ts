import faker from 'faker';
import { QueryInterface } from 'sequelize/types';
import '../../../env';

const createFakeUsers = ((cantidad) => {
  return new Array(cantidad).fill(null).map(() => ({
    email: faker.internet.email(),
    role: 'postulant',
    created_at: new Date(),
    updated_at: new Date(),
  }));
})(10);

const adminUser = {
  email: process.env.ADMIN_EMAIL || 'grupotecho11@gmail.com',
  role: 'admin',
  created_at: new Date(),
  updated_at: new Date(),
};

export async function up(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkInsert(
    'users',
    [...createFakeUsers, adminUser],
    {}
  );
}

export async function down(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkDelete('users', null, {});
}
