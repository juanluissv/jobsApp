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
   * /exampleUser:
   *   post:
   *     tags:
   *      - ExampleUser
   *     description: Creates a new ExampleUser
   *     security:
   *       - Auth:
   *         - exampleUser:create
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - firstName
   *               - lastName
   *             properties:
   *               email:
   *                 type: string
   *                 example: example@email.com
   *               firstName:
   *                 type: string
   *                 example: example
   *               lastName:
   *                 type: string
   *                 example: user
   *     parameters:
   *       - in: query
   *         name: page
   *         description: The number of the page for pagination
   *         schema:
   *           type: integer
   *       - in: query
   *         name: pageSize
   *         description: The number of rows of page
   *         schema:
   *           type: integer
   *       - in: query
   *         name: search
   *         description: The Search query searchs on `email`, `firstName` or `lastName`
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The list of ExampleUsers
   *         content: {}
   */
  .post('/', (req: Req, res: Res, next: Next) => {
    controller
      .create(req.body, req.query)
      .then((r) => res.json(r))
      .catch(next);
  })
  /**
   * @openapi
   * /exampleUser:
   *   get:
   *     tags:
   *      - ExampleUser
   *     description: Gets the list of ExampleUsers
   *     security:
   *       - Auth:
   *         - exampleUser:read
   *     parameters:
   *       - in: query
   *         name: page
   *         description: The number of the page for pagination
   *         schema:
   *           type: integer
   *       - in: query
   *         name: pageSize
   *         description: The number of rows of page
   *         schema:
   *           type: integer
   *       - in: query
   *         name: search
   *         description: The Search query searchs on `email`, `firstName` or `lastName`
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The list of ExampleUsers
   *         content: {}
   */
  .get('/', (req: Req, res: Res, next: Next) => {
    controller
      .read(req.query)
      .then((r) => res.json(r))
      .catch(next);
  })
  /**
   * @openapi
   * /exampleUser:
   *   put:
   *     tags:
   *      - ExampleUser
   *     description: Updates a new ExampleUser
   *     security:
   *       - Auth:
   *         - exampleUser:update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *             properties:
   *               id:
   *                 type: number
   *                 example: 1
   *               email:
   *                 type: string
   *                 example: editedExample@email.com
   *               firstName:
   *                 type: string
   *                 example: editedExample
   *               lastName:
   *                 type: string
   *                 example: editedUser
   *     parameters:
   *       - in: query
   *         name: page
   *         description: The number of the page for pagination
   *         schema:
   *           type: integer
   *       - in: query
   *         name: pageSize
   *         description: The number of rows of page
   *         schema:
   *           type: integer
   *       - in: query
   *         name: search
   *         description: The Search query searchs on `email`, `firstName` or `lastName`
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The list of ExampleUsers
   *         content: {}
   */
  .put('/', (req: Req, res: Res, next: Next) => {
    controller
      .update(req.body, req.query)
      .then((r) => res.json(r))
      .catch(next);
  })
  /**
   * @openapi
   * /exampleUser:
   *   delete:
   *     tags:
   *      - ExampleUser
   *     description: Deletes a ExampleUser
   *     security:
   *       - Auth:
   *         - exampleUser:delete
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *             properties:
   *               id:
   *                 type: number
   *                 example: 1
   *     parameters:
   *       - in: query
   *         name: page
   *         description: The number of the page for pagination
   *         schema:
   *           type: integer
   *       - in: query
   *         name: pageSize
   *         description: The number of rows of page
   *         schema:
   *           type: integer
   *       - in: query
   *         name: search
   *         description: The Search query searchs on `email`, `firstName` or `lastName`
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The list of ExampleUsers
   *         content: {}
   */
  .delete('/', (req: Req, res: Res, next: Next) => {
    controller
      .delete(req.body, req.query)
      .then((r) => res.json(r))
      .catch(next);
  });
