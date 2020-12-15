const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const movieType = require('./types/movieType');
const movieInputType = require('./inputTypes/movieInputType');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createFilm: {
      type: movieType,
      args: {
        movieInput: {
          type: GraphQLNonNull(movieInputType)
        },
      },
      resolve: async (_, { movieInput }) => {
        const movie = await models.Film.create(movieInput);
        return movie;
      }
    },
  },
});

module.exports = mutationType;