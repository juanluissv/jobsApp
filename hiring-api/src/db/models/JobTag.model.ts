import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class JobTag extends Model {
    static associate(models) {
      this.belongsTo(models.Job);
      this.belongsTo(models.Tag);
    }
  }
  JobTag.init(
    {},
    {
      sequelize,
      modelName: 'jobTag',
    }
  );
  return JobTag;
};
