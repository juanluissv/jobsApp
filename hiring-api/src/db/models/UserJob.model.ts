import { Model, DataTypes } from 'sequelize';
import { UserJobsStatus } from './enums';

export default (sequelize) => {
  class UserJob extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Job);
    }
  }
  UserJob.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: Object.values(UserJobsStatus),
      },
      expected_salary: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      similar_experience: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'userJob',
    }
  );
  return UserJob;
};
