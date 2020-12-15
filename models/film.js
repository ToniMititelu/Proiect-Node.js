'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Film.belongsToMany(models.Eticheta, {
        through: 'EtichetaFilm',
      });
      models.Film.belongsToMany(models.Actor, {
        through: 'ActorsFilms',
      });
    }
  };
  Film.init({
    nume: DataTypes.STRING,
    descriere: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    categorie: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};