import db from '../../../db';

const {
  Sequelize: { Op },
} = db;

export default function filterHandler(
  search: string,
  countryId: string,
  condition: string,
  presency: string,
  full_time: string,
  closed_jobs: string
): any {
  let filters = {};
  if (countryId !== '') {
    const countryArray: string[] = countryId.split(',');
    filters = { countryId: countryArray };
  }
  if (condition !== '') filters = { ...filters, condition };
  if (presency !== '') filters = { ...filters, presency };
  if (full_time !== '') filters = { ...filters, full_time };
  if (search !== '') {
    filters = {
      ...filters,
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { requirements: { [Op.iLike]: `%${search}%` } },
      ],
    };
  }
  if (closed_jobs === 'false') {
    filters = {
      ...filters,
      end_date: {
        [Op.or]: {
          [Op.gt]: new Date().toISOString().slice(0, 10),
          [Op.is]: null,
        },
      },
    };
  }

  return filters;
}
