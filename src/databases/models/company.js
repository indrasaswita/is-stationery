'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');
module.exports = (sequelize) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    name: DataTypes.STRING,
    useremployeeIds: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'company',
  });
  return Company;
};