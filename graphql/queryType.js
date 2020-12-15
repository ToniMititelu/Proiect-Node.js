const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql');
const models = require('../models');
const movieType = require('./types/movieType');
const actorType = require('./types/actorType');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    film: {
      type: new GraphQLList(movieType),
      resolve: async(_) => {
        const movies = await models.Film.findAll();
        return movies;
      }
    },
    actor: {
      type: actorType,
      args: {
        actorId: {
          type: GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: async (_, { actorId }) => {
        const actor = await models.Actor.findByPk(actorId);
        return actor;
      }
    }
  }
});

module.exports = queryType;