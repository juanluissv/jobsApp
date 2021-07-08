import db from '../../../db';
import supabaseClient from '../../services/supabase/supabaseClient';

const { User, Job } = db;

class AuthController {
  setAuthCookie(req, res) {
    return supabaseClient.auth.api.setAuthCookie(req, res);
  }

  getUserByCookie(req) {
    return supabaseClient.auth.api
      .getUserByCookie(req)
      .then(({ user: { email } }) => this.sign(email));
  }

  sign(email): Promise<typeof User> {
    return User.findOrCreate({
      where: { email },
      include: [
        {
          model: Job,
          attributes: ['id'],
          through: {
            attributes: {
              exclude: ['jobId', 'userId', 'createdAt', 'updatedAt'],
            },
            where: {
              status: 'pending',
            },
          },
        },
      ],
    }).then(([user]) => {
      return user;
    });
  }
}

export default new AuthController();
