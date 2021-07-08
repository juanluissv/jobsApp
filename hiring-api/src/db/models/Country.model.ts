import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Country extends Model {
    static associate(models) {
      this.hasMany(models.Job);
    }
  }
  Country.init(
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
      modelName: 'country',
    }
  );
  return Country;
};
