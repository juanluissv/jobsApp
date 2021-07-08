import db from '../../../db';

const {
  User,
  Sequelize: { Op },
  Job,
} = db;

interface User {
  identity_id?: string;
  identity_type?: string;
  birthDate?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  phone?: string;
  education?: string;
  techo_experience?: boolean;
  linkedin?: string;
  nationality?: string;
  residence?: string;
  habilities?: string;
}

class Users {
  register(email: string): Promise<any> {
    return User.create(email);
  }

  update(data: User, id: string): Promise<any> {
    return User.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  getById(id: string): Promise<any> {
    return User.findOne({
      where: { id },
      include: [
        {
          model: Job,
          attributes: {
            exclude: ['updatedAt, createdAt'],
          },
        },
      ],
    }).then((user) => {
      if (user !== null) return user;
      throw new Error('user not found');
    });
  }
}
export default new Users();
