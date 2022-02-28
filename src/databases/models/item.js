'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    merkId: Sequelize.INTEGER.UNSIGNED,
    rackId: Sequelize.INTEGER.UNSIGNED,
    barcode: DataTypes.STRING,
    name: DataTypes.STRING,
    longname: DataTypes.STRING,
    sellprice: Sequelize.INTEGER.UNSIGNED,
    sellpriceIds: DataTypes.JSON,
    buyprice: Sequelize.INTEGER.UNSIGNED,
    is_availablestock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};