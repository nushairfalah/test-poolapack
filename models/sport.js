'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.sport.hasMany(models.olympic_winner, { foreignKey: 'sportId' })
    }
  };
  sport.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'sport',
  });
  return sport;
};