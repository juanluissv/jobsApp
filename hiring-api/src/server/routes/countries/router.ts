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
   * /countries:
   *   get:
   *     tags:
   *      - Countries
   *     description: Gets the list of countries
   *
   *     responses:
   *       200:
   *         description: The list of countries
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *
   */
  .get('/', (req: Req, res: Res, next: Next) => {
    controller
      .getAll()
      .then((countries) => {
        res.status(200).json(countries);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /countries:
   *   post:
   *     tags:
   *      - countries
   *     description: Create a country
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                 type: string
   *                 example: Argentina
   *               code:
   *                 type: string
   *                 example: AR
   *     responses:
   *       200:
   *         description: created country
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Country not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .post('/', (req: Req, res: Res, next: Next) => {
    controller
      .create(req.body)
      .then((countries) => {
        res.status(200).json(countries);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /countries/{id}:
   *   delete:
   *     tags:
   *      - countries
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 6
   *     description: Delete a country by ID
   *
   *     responses:
   *       200:
   *         description: Deleted a country
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: tag not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .delete('/:id', (req: Req, res: Res, next: Next) => {
    const { id } = req.params;
    controller
      .delete(id)
      .then((countries) => {
        res.status(200).json(countries);
      })
      .catch(next);
  });
