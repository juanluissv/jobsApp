import db from '../../../db';

const { Country } = db;

interface Country {
  name: string;
  code?: string;
}

class CountryController {
  create({ name, code }: Country): Promise<any> {
    return Country.create({
      name,
      code,
    }).then(() => this.getAll());
  }
  delete(id: string): Promise<any> {
    return Country.destroy({ where: { id } }).then((deleted) => {
      if (deleted > 0) return this.getAll();
      throw new Error('Country not found');
    });
  }
  getAll(): Promise<any> {
    return Country.findAll();
  }
}
export default new CountryController();
