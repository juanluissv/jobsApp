import { QueryInterface } from 'sequelize/types';

const countries = [
  { name: 'Oficina Internacional' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Chile', code: 'CL' },
  { name: 'Brasil', code: 'BR' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Peru', code: 'PE' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Panama', code: 'PA' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Costa Rica', code: 'CR' },
];

const createCountries = countries.map((country) => {
  return {
    name: country.name,
    code: country.code,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

export async function up(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkInsert('countries', createCountries);
}

export async function down(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkDelete('countries', null, {});
}
