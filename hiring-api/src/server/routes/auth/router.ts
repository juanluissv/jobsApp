import {
  Router,
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from 'express';
import controller from './controller';

export default Router()
  .post('/', controller.setAuthCookie)
  .post('/me', (req: Req, res: Res, next: Next) => {
    if (typeof req.headers.cookie !== 'string') {
      return res.status(401).json({ error: 'Missing auth token.' });
    }
    controller
      .getUserByCookie(req)
      .then((user) => res.status(200).json(user))
      .catch(next);
  });
