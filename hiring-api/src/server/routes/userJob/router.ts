import {
  Request as Req,
  Response as Res,
  NextFunction as Next,
  Router,
} from 'express';
import controller from './controller';

export default Router()
  /**
   * @openapi
   * /user_job/postulate/{userId}/{jobId}:
   *   get:
   *     tags:
   *      - user_job
   *     parameters:
   *      - in: path
   *        name: jobId
   *        required: true
   *        schema:
   *          type: string
   *          example: 7
   *      - in: path
   *        name: userId
   *        required: true
   *        schema:
   *          type: string
   *          example: 14
   *     description: Get info of a especific job for an user
   *     responses:
   *       200:
   *         description: Information of a especific job for an user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: UserJob not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .get('/postulate/:userId/:jobId', (req: Req, res: Res, next: Next) => {
    const { jobId, userId } = req.params;
    controller
      .getPostulantInfo(userId, jobId)
      .then((infoPostulant) => res.status(200).send(infoPostulant))
      .catch(next);
  })
  /**
   * @openapi
   * /user_job/jobs/{userId}:
   *   get:
   *     tags:
   *      - user_job
   *     parameters:
   *      - in: path
   *        name: userId
   *        required: true
   *        schema:
   *          type: string
   *          example: 14
   *      - in: query
   *        name: page
   *        required: false
   *        schema:
   *          type: number
   *          example: 0
   *      - in: query
   *        name: pageSize
   *        required: false
   *        schema:
   *          type: number
   *          example: 10
   *     description: Post the last data details of the postulation of an user
   *     responses:
   *       200:
   *         description: All the jobs the user apply to
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: UserJob not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .get('/jobs/:userId', (req: Req, res: Res, next: Next) => {
    const { userId } = req.params;
    controller
      .getJobsByUserId(userId, req.query)
      .then((jobsArray) => res.status(200).send(jobsArray))
      .catch(next);
  })
  /**
   * @openapi
   * /user_job/applicants/{jobId}:
   *   get:
   *     tags:
   *      - user_job
   *     parameters:
   *      - in: path
   *        name: jobId
   *        required: true
   *        schema:
   *          type: string
   *          example: 2
   *      - in: query
   *        name: page
   *        required: false
   *        schema:
   *          type: number
   *          example: 0
   *      - in: query
   *        name: pageSize
   *        required: false
   *        schema:
   *          type: number
   *          example: 10
   *     description: Get all the users that apply for a specific job
   *     responses:
   *       200:
   *         description: An array with all the users that applied for the job
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       400:
   *         description: UserJob not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "No tiene postulantes"}
   */
  .get('/applicants/:jobId', (req: Req, res: Res, next: Next) => {
    const { jobId } = req.params;
    controller
      .getPostulantsByJobId(jobId, req.query)
      .then((usersArray) => res.status(200).send(usersArray))
      .catch(next);
  })
  /**
   * @openapi
   * /user_job/postulate/{userId}/{jobId}:
   *   post:
   *     tags:
   *      - user_job
   *     parameters:
   *      - in: path
   *        name: jobId
   *        required: true
   *        schema:
   *          type: string
   *          example: 7
   *      - in: path
   *        name: userId
   *        required: true
   *        schema:
   *          type: string
   *          example: 14
   *      - in: query
   *        name: page
   *        required: false
   *        schema:
   *          type: number
   *          example: 0
   *      - in: query
   *        name: pageSize
   *        required: false
   *        schema:
   *          type: number
   *          example: 10
   *     description: Post the last data details of the postulation of an user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - status
   *               - expected_salary
   *               - similar_experience
   *             properties:
   *               status:
   *                 type: string
   *                 enum:
   *                  - accepted
   *                  - pending
   *                  - rejected
   *                 example: pending
   *               expected_salary:
   *                 type: integer
   *                 example: 500
   *               similar_experience:
   *                 type: string
   *                 example: work in the managment of the finances office
   *
   *     responses:
   *       200:
   *         description: Postulation successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: UserJob not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .post('/postulate/:userId/:jobId', (req: Req, res: Res, next: Next) => {
    const { jobId, userId } = req.params;
    controller
      .postulate(req.body, userId, jobId, req.query)
      .then((jobPostulation) => res.status(200).send(jobPostulation))
      .catch(next);
  })
  /**
   * @openapi
   * /user_job/postulate/{userId}/{jobId}:
   *   patch:
   *     tags:
   *      - user_job
   *     parameters:
   *      - in: path
   *        name: jobId
   *        required: true
   *        schema:
   *          type: string
   *          example: 7
   *      - in: path
   *        name: userId
   *        required: true
   *        schema:
   *          type: string
   *          example: 14
   *     description: Update user postulate details for a job
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *                 enum:
   *                  - accepted
   *                  - pending
   *                  - rejected
   *                 example: pending
   *               expected_salary:
   *                 type: integer
   *                 example: 500
   *               similar_experience:
   *                 type: string
   *                 example: work in the managment of the finances office
   *
   *     responses:
   *       200:
   *         description: Postulation successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: UserJob not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .patch('/postulate/:userId/:jobId', (req: Req, res: Res, next: Next) => {
    const { jobId, userId } = req.params;
    controller
      .updatePostulantInfo(req.body, userId, jobId)
      .then((jobPostulation) => res.status(200).send(jobPostulation))
      .catch(next);
  });
