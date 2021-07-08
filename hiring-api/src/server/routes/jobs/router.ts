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
   * /jobs:
   *   get:
   *     tags:
   *      - Jobs
   *     description: Gets the list of jobs
   *     parameters:
   *       - in: query
   *         name: page
   *         description: The number of the page for pagination
   *         schema:
   *           type: number
   *       - in: query
   *         name: pageSize
   *         description: The number of rows per page
   *         schema:
   *           type: number
   *       - in: query
   *         name: search
   *         description: The Search query searchs on `position`, `name` or `requirements`
   *         schema:
   *           type: string
   *       - in: query
   *         name: countryId
   *         description: The country from where the job is
   *         schema:
   *           type: string
   *       - in: query
   *         name: condition
   *         description: Contract/volunteer
   *         schema:
   *           type: string
   *           enum:
   *            - contract
   *            - volunteer
   *       - in: query
   *         name: tags
   *         description: tagsId 1,2,3,4,5
   *         schema:
   *           type: string
   *       - in: query
   *         name: presency
   *         description: Full/Semi/Remote
   *         schema:
   *           type: string
   *           enum:
   *            - full_presency
   *            - semi_presency
   *            - remote
   *       - in: query
   *         name: full_time
   *         description: True/False
   *         schema:
   *           type: boolean
   *       - in: query
   *         name: sortBy
   *         description: property of the jobs to be sorted
   *         schema:
   *           type: string
   *           example: name
   *       - in: query
   *         name: sortFrom
   *         description: sense of sorting
   *         schema:
   *           type: string
   *           example: name
   *       - in: query
   *         name: closed_jobs
   *         description: include or not the closed jobs
   *         schema:
   *           type: boolean
   *           example: false
   *     responses:
   *       200:
   *         description: The list of jobs
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   */
  .get('/', (req: Req, res: Res, next: Next) => {
    controller
      .filter(req.query)
      .then((job) => {
        res.status(200).json(job);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /jobs/{id}:
   *   get:
   *     tags:
   *      - jobs
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 6
   *     description: Gets a job by Id
   *     responses:
   *       200:
   *         description: match Job by id
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Job not found
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
      .then((job) => {
        res.status(200).json(job);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /jobs:
   *   post:
   *     tags:
   *      - jobs
   *     description: Create a job
   *     parameters:
   *       - in: query
   *         name: page
   *         description: The number of the page for pagination
   *         schema:
   *           type: number
   *       - in: query
   *         name: pageSize
   *         description: The number of rows per page
   *         schema:
   *           type: number
   *       - in: query
   *         name: search
   *         description: The Search query searchs on `position`, `name` or `requirements`
   *         schema:
   *           type: string
   *       - in: query
   *         name: countryId
   *         description: The country from where the job is
   *         schema:
   *           type: string
   *       - in: query
   *         name: condition
   *         description: Contract/volunteer
   *         schema:
   *           type: string
   *           enum:
   *            - contract
   *            - volunteer
   *       - in: query
   *         name: tags
   *         description: tagsId 1,2,3,4,5
   *         schema:
   *           type: string
   *       - in: query
   *         name: presency
   *         description: Full/Semi/Remote
   *         schema:
   *           type: string
   *           enum:
   *            - full_presency
   *            - semi_presency
   *            - remote
   *       - in: query
   *         name: full_time
   *         description: True/False
   *         schema:
   *           type: boolean
   *       - in: query
   *         name: sortBy
   *         description: property of the jobs to be sorted
   *         schema:
   *           type: string
   *           example: name
   *       - in: query
   *         name: sortFrom
   *         description: sense of sorting
   *         schema:
   *           type: string
   *           example: name
   *       - in: query
   *         name: closed_jobs
   *         description: include or not the closed jobs
   *         schema:
   *           type: boolean
   *           example: false
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - requirements
   *               - benefits
   *               - objectives
   *               - responsibilities
   *               - presency
   *               - full_time
   *               - start_date
   *               - status
   *               - salary_range_low
   *               - salary_range_high
   *               - condition
   *               - countryId
   *               - tags
   *             properties:
   *               name:
   *                 type: string
   *                 example: Dirección
   *               requirements:
   *                 type: string
   *                 example: Conocimientos y experiencia
   *               benefits:
   *                 type: string
   *                 example: Sueldo
   *               objectives:
   *                 type: string
   *                 example: Organización
   *               responsibilities:
   *                 type: string
   *                 example: Coordinar equipo
   *               presency:
   *                 type: string
   *                 enum:
   *                   - full_presency
   *                   - semi_presency
   *                   - remote
   *                 example: full_presency
   *               full_time:
   *                 type: boolean
   *                 example: true
   *               start_date:
   *                 type: string
   *                 example: 2020-06-05
   *               end_date:
   *                 type: string
   *                 nullable: true
   *                 example: 2020-06-20
   *               status:
   *                 type: string
   *                 enum:
   *                   - open
   *                   - closed
   *                   - paused
   *                 example: open
   *               salary_range_low:
   *                 type: number
   *                 example: 200
   *               salary_range_high:
   *                 type: number
   *                 example: 400
   *               condition:
   *                 type: string
   *                 enum:
   *                   - volunteer
   *                   - contract
   *                 example: volunteer
   *               countryId:
   *                 type: number
   *                 example: 1
   *               tags:
   *                 type: array
   *                 items:
   *                   type: number
   *                 uniqueItems: true
   *                 example: [1,2,3,4]
   *     responses:
   *       200:
   *         description: created job
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Job not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .post('/', (req: Req, res: Res, next: Next) => {
    controller
      .create(req.body, req.query)
      .then((filteredJobs) => {
        res.status(200).json(filteredJobs);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /jobs/{id}:
   *   put:
   *     tags:
   *      - jobs
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 6
   *      - in: query
   *        name: page
   *        description: The number of the page for pagination
   *        schema:
   *          type: number
   *      - in: query
   *        name: pageSize
   *        description: The number of rows per page
   *        schema:
   *          type: number
   *      - in: query
   *        name: search
   *        description: The Search query searchs on `position`, `name` or `requirements`
   *        schema:
   *          type: string
   *      - in: query
   *        name: countryId
   *        description: The country from where the job is
   *        schema:
   *          type: string
   *      - in: query
   *        name: condition
   *        description: Contract/volunteer
   *        schema:
   *          type: string
   *          enum:
   *           - contract
   *           - volunteer
   *      - in: query
   *        name: tags
   *        description: tagsId 1,2,3,4,5
   *        schema:
   *          type: string
   *      - in: query
   *        name: presency
   *        description: Full/Semi/Remote
   *        schema:
   *          type: string
   *          enum:
   *           - full_presency
   *           - semi_presency
   *           - remote
   *      - in: query
   *        name: full_time
   *        description: True/False
   *        schema:
   *          type: boolean
   *      - in: query
   *        name: sortBy
   *        description: property of the jobs to be sorted
   *        schema:
   *          type: string
   *          example: name
   *      - in: query
   *        name: sortFrom
   *        description: sense of sorting
   *        schema:
   *          type: string
   *          example: name
   *      - in: query
   *        name: closed_jobs
   *        description: include or not the closed jobs
   *        schema:
   *          type: boolean
   *          example: false
   *     description: Update a job by ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - requirements
   *               - benefits
   *               - objectives
   *               - responsibilities
   *               - presency
   *               - full_time
   *               - start_date
   *               - status
   *               - salary_range_low
   *               - salary_range_high
   *               - condition
   *               - countryId
   *               - tags
   *             properties:
   *               name:
   *                 type: string
   *                 example: Dirección
   *               requirements:
   *                 type: string
   *                 example: Conocimientos y experiencia
   *               benefits:
   *                 type: string
   *                 example: Sueldo
   *               objectives:
   *                 type: string
   *                 example: Organización
   *               responsibilities:
   *                 type: string
   *                 example: Coordinar equipo
   *               presency:
   *                 type: string
   *                 enum:
   *                   - full_presency
   *                   - semi_presency
   *                   - remote
   *                 example: full_presency
   *               full_time:
   *                 type: boolean
   *                 example: true
   *               start_date:
   *                 type: string
   *                 example: 2020-06-05
   *               end_date:
   *                 type: string
   *                 nullable: true
   *                 example: 2020-06-20
   *               status:
   *                 type: string
   *                 enum:
   *                   - open
   *                   - closed
   *                   - paused
   *                 example: open
   *               salary_range_low:
   *                 type: number
   *                 example: 200
   *               salary_range_high:
   *                 type: number
   *                 example: 400
   *               condition:
   *                 type: string
   *                 enum:
   *                   - volunteer
   *                   - contract
   *                 example: volunteer
   *               countryId:
   *                 type: number
   *                 example: 1
   *               tags:
   *                 type: array
   *                 items:
   *                   type: number
   *                 uniqueItems: true
   *                 example: [1,2,3,4]
   *     responses:
   *       200:
   *         description: Updated a job by ID
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Job not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .put('/:id', (req: Req, res: Res, next: Next) => {
    const { id } = req.params;
    controller
      .update(req.body, id, req.query)
      .then((filteredJobs) => {
        res.status(200).json(filteredJobs);
      })
      .catch(next);
  })
  /**
   * @openapi
   * /jobs/{id}:
   *   delete:
   *     tags:
   *      - jobs
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *          example: 6
   *      - in: query
   *        name: page
   *        description: The number of the page for pagination
   *        schema:
   *          type: number
   *      - in: query
   *        name: pageSize
   *        description: The number of rows per page
   *        schema:
   *          type: number
   *      - in: query
   *        name: search
   *        description: The Search query searchs on `position`, `name` or `requirements`
   *        schema:
   *          type: string
   *      - in: query
   *        name: countryId
   *        description: The country from where the job is
   *        schema:
   *          type: string
   *      - in: query
   *        name: condition
   *        description: Contract/volunteer
   *        schema:
   *          type: string
   *          enum:
   *           - contract
   *           - volunteer
   *      - in: query
   *        name: tags
   *        description: tagsId 1,2,3,4,5
   *        schema:
   *          type: string
   *      - in: query
   *        name: presency
   *        description: Full/Semi/Remote
   *        schema:
   *          type: string
   *          enum:
   *           - full_presency
   *           - semi_presency
   *           - remote
   *      - in: query
   *        name: full_time
   *        description: True/False
   *        schema:
   *          type: boolean
   *      - in: query
   *        name: sortBy
   *        description: property of the jobs to be sorted
   *        schema:
   *          type: string
   *          example: name
   *      - in: query
   *        name: sortFrom
   *        description: sense of sorting
   *        schema:
   *          type: string
   *          example: name
   *      - in: query
   *        name: closed_jobs
   *        description: include or not the closed jobs
   *        schema:
   *          type: boolean
   *          example: false
   *     description: Delete a job by ID
   *
   *     responses:
   *       200:
   *         description: Deleted a job
   *         content:
   *            application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Job not found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: {"message": "Error 404. Request not found"}
   */
  .delete('/:id', (req: Req, res: Res, next: Next) => {
    const { id } = req.params;
    controller
      .delete(id, req.query)
      .then((filteredJobs) => {
        res.status(200).json(filteredJobs);
      })
      .catch(next);
  });
