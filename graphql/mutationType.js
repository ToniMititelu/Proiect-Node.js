const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const movieType = require('./types/movieType');
const movieInputType = require('./inputTypes/movieInputType');
const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');

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
      resolve: async (_, {movieInput}) => {
        const movie = await models.Film.create(movieInput);
        return movie;
      }
    },
    login: {
      type: GraphQLString,
      args: {
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, {email, password}) => {
        const user = await models.User.findOne({
          where: {
            email,
          }
        });

        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            // Pasam `userId` in token pentru a-l folosi la validarea tokenului (authenticationMiddleware)
            return jwt.sign({userId: user.id}, config.JWTSECRET);
          }
        }

        return null;
      },
    },
  }
});

module.exports = mutationType;