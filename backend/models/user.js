'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      telephoneNumber: DataTypes.STRING,
      fullAddress: DataTypes.STRING,
      ssn: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
          args: true,
          msg: 'Username is already in use!',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: 8,
          },
        },
      },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
