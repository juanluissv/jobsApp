import { Model, DataTypes } from 'sequelize';
import { JobStatus, JobCondition, Presency } from './enums';

export default (sequelize) => {
  class Job extends Model {
    static associate(models) {
      this.belongsTo(models.Country);
      this.belongsToMany(models.User, {
        through: models.UserJob,
      });
      this.belongsToMany(models.Tag, {
        through: models.JobTag,
      });
    }
  }
  Job.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      requirements: {
        type: DataTypes.TEXT,
      },

      benefits: {
        type: DataTypes.TEXT,
      },

      objectives: {
        type: DataTypes.TEXT,
      },

      responsibilities: {
        type: DataTypes.TEXT,
      },
      presency: {
        type: DataTypes.ENUM,
        values: Object.values(Presency),
        defaultValue: Presency.FULL_PRESENCY,
      },
      full_time: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(JobStatus),
      },
      salary_range_low: {
        type: DataTypes.INTEGER(),
      },
      salary_range_high: {
        type: DataTypes.INTEGER(),
      },
      condition: {
        type: DataTypes.ENUM,
        values: Object.values(JobCondition),
      },
    },
    {
      sequelize,
      modelName: 'job',
    }
  );
  return Job;
};
