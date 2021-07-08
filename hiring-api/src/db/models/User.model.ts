import { Model, DataTypes } from 'sequelize';
import { UserRole } from './enums';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Job, {
        through: models.UserJob,
      });
    }
  }
  User.init(
    {
      identity_number: {
        type: DataTypes.STRING,
      },
      identity_type: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
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
      role: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: Object.values(UserRole),
        defaultValue: UserRole.POSTULANT,
      },
      phone: {
        type: DataTypes.STRING,
      },
      education: {
        type: DataTypes.TEXT,
      },
      techo_experience: {
        type: DataTypes.BOOLEAN,
      },
      linkedin: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      habilities: {
        type: DataTypes.TEXT,
      },
      nationality: {
        type: DataTypes.STRING,
      },
      residence: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return User;
};
