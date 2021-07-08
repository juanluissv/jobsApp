import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ExampleUser extends Model {
    static associate(_models) {
      // ...
    }
  }
  ExampleUser.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Please enter a valid email' },
        },
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'example_user',
    }
  );
  return ExampleUser;
};
