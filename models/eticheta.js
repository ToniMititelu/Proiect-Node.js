'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eticheta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Eticheta.belongsToMany(models.Film, {
        through: 'EtichetaFilm',
      });
    }
  };
  Eticheta.init({
    nume: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Eticheta',
  });
  return Eticheta;
};