import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Job, {
        through: models.JobTag,
      });
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'tag',
    }
  );
  return Tag;
};
