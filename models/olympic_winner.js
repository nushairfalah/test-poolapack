'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class olympic_winner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.olympic_winner.belongsTo(models.country, { foreignKey: 'countryId' })
      models.olympic_winner.belongsTo(models.sport, { foreignKey: 'sportId' })
    }
  };
  olympic_winner.init({
    athlete: DataTypes.STRING,
    age: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
    country_group: DataTypes.STRING,
    year: DataTypes.INTEGER,
    date: DataTypes.DATE,
    sportId: DataTypes.INTEGER,
    gold: DataTypes.INTEGER,
    silver: DataTypes.INTEGER,
    bronze: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: true,
    modelName: 'olympic_winner',
  });
  return olympic_winner;
};