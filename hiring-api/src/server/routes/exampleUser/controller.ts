import db from '../../../db';

const {
  ExampleUser,
  Sequelize: { Op },
} = db;

class ExampleUserController {
  create({ email, firstName, lastName }, query): Promise<any> {
    return ExampleUser.create({ email, firstName, lastName }).then(() =>
      this.read(query)
    );
  }

  read({ page = 0, pageSize = 10, search = '' }): Promise<any> {
    return ExampleUser.findAndCountAll({
      where: search && {
        [Op.or]: [
          { email: { [Op.iLike]: `%${search}%` } },
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
        ],
      },
      offset: page * pageSize,
      limit: pageSize,
    }).then(({ count, rows }) => ({
      page,
      totalCount: count,
      data: rows,
    }));
  }

  update({ id, email, firstName, lastName }, query): Promise<any> {
    return ExampleUser.update(
      { email, firstName, lastName },
      { where: { id } }
    ).then(() => this.read(query));
  }

  delete({ id }, query): Promise<any> {
    return ExampleUser.destroy({ where: { id } }).then(() => this.read(query));
  }
}

export default new ExampleUserController();
