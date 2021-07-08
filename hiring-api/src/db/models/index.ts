// eslint-disable-next-line @typescript-eslint/no-empty-interface
import ExampleUser from './ExampleUser.model';
import User from './User.model';
import Job from './Job.model';
import UserJob from './UserJob.model';
import Country from './Country.model';
import Tag from './Tag.model';
import JobTag from './JobTag.model';

export interface MODELS {
  ExampleUser: any;
  User: any;
  Job: any;
  UserJob: any;
  Country: any;
  Tag: any;
  JobTag: any;
}

const models: MODELS = {
  ExampleUser,
  User,
  Job,
  UserJob,
  Country,
  Tag,
  JobTag,
};

export default models;
