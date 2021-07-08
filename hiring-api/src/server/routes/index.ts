import { Router } from 'express';

import exampleUser from './exampleUser/router';
import users from './users/router';
import jobs from './jobs/router';
import auth from './auth/router';
import countries from './countries/router';
import userJobs from './userJob/router';
import tags from './tags/router';

export default Router()
  /**
   * @openapi
   * tags:
   *   - name: ExampleUser
   *     description: The ExampleUser endpoints
   */
  .use('/exampleUser', exampleUser)
  /**
   * @openapi
   * tags:
   *   - name: users
   *     description: Updates data from user
   */
  .use('/users', users)
  /**
   * @openapi
   * tags:
   *   - name: jobs
   *     description: Updates data from job
   */
  .use('/jobs', jobs)
  /**
   * @openapi
   * tags:
   *   - name: auth
   *     description: Authentication endpoints
   */
  .use('/auth', auth)
  /**
   * @openapi
   * tags:
   *   - name: countries
   *     description: Countries routes
   */
  .use('/countries', countries)
  /**
   * @openapi
   * tags:
   *   - name: user_job
   *     description: UserJob routes
   */
  .use('/user_job', userJobs)
  /**
   * @openapi
   * tags:
   *   - name: countries
   *     description: Countries routes
   */
  .use('/tags', tags);
