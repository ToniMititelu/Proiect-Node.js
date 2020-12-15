const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');
const movieType = require('./movieType');
const models = require('../../models');

const actorType = new GraphQLObjectType({
  name: 'Actor',
  fields: {
    id: { type: GraphQLInt },
    nume: { type: GraphQLString },
    gen: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    movies: {
        type: new GraphQLList(movieType),
        resolve: async(parent) => {
          const movies = await parent.getFilms();
          return movies;
        }
    }
  }
});

module.exports = actorType;