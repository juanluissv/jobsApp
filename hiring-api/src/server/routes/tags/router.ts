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
   * /tags:
   *   get:
   *     tags:
   *      - Tags
   *     description: Gets the list of tags
   *
   *     responses:
   *       200:
   *         description: The list of tags
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *
   */
  .get('/', (req: Req, res: Res, next: Next) => {
    controller
      .getAll()
      .then((tags) => {
        res.status(200).json(tags);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /tags/{id}:
   *   get:
   *     tags:
   *      - tags
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 6
   *     description: Gets a tag by Id
   *     responses:
   *       200:
   *         description: match tag by id
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Tag not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .get('/:id', (req: Req, res: Res, next: Next) => {
    const { id } = req.params;
    controller
      .getById(id)
      .then((tag) => {
        res.status(200).json(tag);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /tags:
   *   post:
   *     tags:
   *      - Tags
   *     description: Gets the list of tags
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - code
   *             properties:
   *               name:
   *                 type: string
   *                 example: Dirección General
   *               code:
   *                 type: string
   *                 nullable: true
   *                 example: DG
   *
   *     responses:
   *       200:
   *         description: The list of tags
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *
   */
  .post('/', (req: Req, res: Res, next: Next) => {
    controller
      .create(req.body)
      .then((tags) => {
        res.status(200).json(tags);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /tags/{id}:
   *   delete:
   *     tags:
   *      - tags
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 6
   *     description: Delete a tag by ID
   *
   *     responses:
   *       200:
   *         description: Deleted a tag
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
      .then((tags) => {
        res.status(200).json(tags);
      })
      .catch(next);
  });
