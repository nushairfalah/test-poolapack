'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.country.hasMany(models.olympic_winner, { foreignKey: 'countryId' })
    }
  };
  country.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'country',
  });
  return country;
};