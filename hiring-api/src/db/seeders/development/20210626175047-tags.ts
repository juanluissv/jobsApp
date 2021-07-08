import { QueryInterface } from 'sequelize/types';

const tags = [
  { name: 'Dirección General', code: 'DG' },
  { name: 'Direccion Regional', code: 'DR' },
  { name: 'Desarrollo de Fondos', code: 'DF' },
  { name: 'Voluntariado y Personas', code: 'VP' },
  { name: 'Comunicaciones', code: 'COM' },
  { name: 'Administración y Finanzas', code: 'AF' },
  { name: 'Tecnologia', code: 'TEC' },
  { name: 'Gestión Comunitaria/Territorial', code: 'GC/T' },
  { name: 'Vivienda y Habitat', code: 'VH' },
  { name: 'Juridico', code: 'JUR' },
];

const createTags = tags.map((tag) => {
  return {
    name: tag.name,
    code: tag.code,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

export async function up(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkInsert('tags', createTags);
}

export async function down(queryInterface: QueryInterface): Promise<unknown> {
  return await queryInterface.bulkDelete('tags', null, {});
}
