import {
  Router,
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from 'express';
import controller from './controller';

export default Router()
  /**
   * @openapi
   * /users/{id}:
   *   get:
   *     tags:
   *      - users
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 135
   *     description: Get data from user
   *     responses:
   *       200:
   *         description: Update user successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 identity_id:
   *                   type: string
   *                   example: 39912141
   *                 identity_type:
   *                   type: string
   *                   example: D.N.I
   *                 birthDate:
   *                   type: string
   *                   example: 1994/05/04
   *                 email:
   *                   type: string
   *                   example: test@test.com
   *                 firstName:
   *                   type: string
   *                   example: name
   *                 lastName:
   *                   type: string
   *                   example: lastname
   *                 role:
   *                   type: string
   *                   enum:
   *                    - postulant
   *                    - admin
   *                   example: postulant
   *                 phone:
   *                   type: string
   *                   example: 54911685478596
   *                 education:
   *                   type: string
   *                   example: Me forme como stack developer en henry
   *                 techo_experience:
   *                   type: boolean
   *                   example: false
   *                 linkedin:
   *                   type: string
   *                   format: uri
   *                   example: https://linkedin.profile.com
   *                 nationality:
   *                   type: string
   *                   example: argentina
   *                 residence:
   *                   type: string
   *                   example: argentina
   *                 habilities:
   *                   type: string
   *                   example: good with team work
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .get('/:id', (req: Req, res: Res, next: Next) => {
    controller
      .getById(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => next(error));
  })
  /**
   * @openapi
   * /users/{id}:
   *   put:
   *     tags:
   *      - users
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 135
   *     description: Updates data from user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - lastName
   *               - phone
   *               - education
   *               - techo_experience
   *               - nationality
   *               - residence
   *               - identity_number
   *               - identity_type
   *               - birthDate
   *               - habilities
   *             properties:
   *               identity_number:
   *                 type: string
   *                 example: 39912141
   *               identity_type:
   *                 type: string
   *                 example: D.N.I
   *               birthDate:
   *                 type: string
   *                 example: 1994/05/04
   *               email:
   *                 type: string
   *                 example: test@test.com
   *               firstName:
   *                 type: string
   *                 example: name
   *               lastName:
   *                 type: string
   *                 example: lastname
   *               phone:
   *                 type: string
   *                 example: 54911685478596
   *               education:
   *                 type: string
   *                 example: Me forme como stack developer en henry
   *               techo_experience:
   *                 type: boolean
   *                 example: false
   *               linkedin:
   *                 type: string
   *                 format: uri
   *                 nullable: true
   *                 example: https://linkedin.profile.com
   *               habilities:
   *                 type: string
   *                 example: good with team work
   *               nationality:
   *                 type: string
   *                 example: argentina
   *               residence:
   *                 type: string
   *                 example: argentina
   *     responses:
   *       200:
   *         description: Update user successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .put('/:id', (req: Req, res: Res, next: Next) => {
    controller
      .update(req.body, req.params.id)
      .then(([, user]) => {
        res.status(200).json(user);
      })
      .catch((error) => next(error));
  })
  /**
   * @openapi
   * /users/{id}:
   *   patch:
   *     tags:
   *      - users
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 135
   *     description: Updates data from user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               identity_number:
   *                 type: string
   *                 nullable: true
   *                 example: 39912141
   *               identity_type:
   *                 type: string
   *                 nullable: true
   *                 example: D.N.I
   *               birthDate:
   *                 type: string
   *                 nullable: true
   *                 example: 1994/05/04
   *               email:
   *                 type: string
   *                 example: test@test.com
   *               firstName:
   *                 type: string
   *                 nullable: true
   *                 example: name
   *               lastName:
   *                 type: string
   *                 nullable: true
   *                 example: lastname
   *               phone:
   *                 type: string
   *                 nullable: true
   *                 example: 54911685478596
   *               education:
   *                 type: string
   *                 nullable: true
   *                 example: Me forme como stack developer en henry
   *               techo_experience:
   *                 type: boolean
   *                 nullable: true
   *                 example: false
   *               linkedin:
   *                 type: string
   *                 format: uri
   *                 nullable: true
   *                 example: https://linkedin.profile.com
   *               habilities:
   *                 type: string
   *                 nullable: true
   *                 example: good with team work
   *               nationality:
   *                 type: string
   *                 nullable: true
   *                 example: argentina
   *               residence:
   *                 type: string
   *                 nullable: true
   *                 example: argentina
   *     responses:
   *       200:
   *         description: Update user successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .patch('/:id', (req: Req, res: Res, next: Next) => {
    controller
      .update(req.body, req.params.id)
      .then(([, user]) => {
        res.status(200).json(user);
      })
      .catch((error) => next(error));
  });
